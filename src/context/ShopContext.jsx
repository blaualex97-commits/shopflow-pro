
import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import products from "../data/products";
import { useLanguage } from "./LanguageContext";

const ShopContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function getCartKey(product) {
  const offerId = product.selectedOffer?.id || "default";
  return `${product.id}-${offerId}`;
}

function generateOrderId() {
  const now = new Date();

  const datePart = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");

  const randomPart = Math.floor(1000 + Math.random() * 9000);

  return `SF-${datePart}-${randomPart}`;
}

export function ShopProvider({ children }) {
  const { t } = useLanguage();

  const [cart, setCart] = useState(() =>
    readStorage("shopflow_cart", []),
  );

  const [favorites, setFavorites] = useState(() =>
    readStorage("shopflow_favorites", []),
  );

  const [orders, setOrders] = useState(() =>
    readStorage("shopflow_orders", []),
  );

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  const toastTimer = useRef(null);

  const showToast = (message, type = "success") => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setToast({
      message,
      type,
    });

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 2600);
  };

  const saveCart = (nextCart) => {
    setCart(nextCart);

    localStorage.setItem(
      "shopflow_cart",
      JSON.stringify(nextCart),
    );
  };

  const saveFavorites = (nextFavorites) => {
    setFavorites(nextFavorites);

    localStorage.setItem(
      "shopflow_favorites",
      JSON.stringify(nextFavorites),
    );
  };

  const saveOrders = (nextOrders) => {
    setOrders(nextOrders);

    localStorage.setItem(
      "shopflow_orders",
      JSON.stringify(nextOrders),
    );
  };

  // CART

  const addToCart = (product, quantity = 1) => {
    const cartKey = getCartKey(product);

    const existingItem = cart.find(
      (item) => item.cartKey === cartKey,
    );

    let nextCart;

    if (existingItem) {
      nextCart = cart.map((item) =>
        item.cartKey === cartKey
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item,
      );
    } else {
      nextCart = [
        ...cart,
        {
          cartKey,
          productId: product.id,
          quantity,

          selectedOffer: product.selectedOffer
            ? { ...product.selectedOffer }
            : null,

          price: product.selectedOffer?.price ?? product.price,

          oldPrice:
            product.selectedOffer?.oldPrice ?? product.oldPrice,

          stock: product.selectedOffer?.stock ?? product.stock,
        },
      ];
    }

    saveCart(nextCart);

    // Deschide automat cosul dupa adaugarea unui produs.
    setIsCartOpen(true);

    showToast(t("toast.addedToCart"));
  };

  const removeFromCart = (cartKey) => {
    const nextCart = cart.filter(
      (item) => item.cartKey !== cartKey,
    );

    saveCart(nextCart);
    showToast(t("toast.removedFromCart"));
  };

  const updateQuantity = (cartKey, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartKey);
      return;
    }

    const nextCart = cart.map((item) =>
      item.cartKey === cartKey
        ? {
            ...item,
            quantity,
          }
        : item,
    );

    saveCart(nextCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  // FAVORITES

  const toggleFavorite = (product) => {
    const exists = favorites.includes(product.id);

    const nextFavorites = exists
      ? favorites.filter((id) => id !== product.id)
      : [...favorites, product.id];

    saveFavorites(nextFavorites);

    showToast(
      exists
        ? t("toast.removedFavorite")
        : t("toast.addedFavorite"),
    );
  };

  const isFavorite = (productId) =>
    favorites.includes(productId);

  // DERIVED CART AND FAVORITES DATA

  const cartItems = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find(
          (productItem) => productItem.id === item.productId,
        );

        if (!product) {
          return null;
        }

        return {
          ...product,

          cartKey: item.cartKey || `${product.id}-default`,

          quantity: item.quantity,

          price: item.price ?? product.price,

          oldPrice: item.oldPrice ?? product.oldPrice,

          stock: item.stock ?? product.stock,

          selectedOffer: item.selectedOffer || null,
        };
      })
      .filter(Boolean);
  }, [cart]);

  const favoriteProducts = useMemo(() => {
    return products.filter((product) =>
      favorites.includes(product.id),
    );
  }, [favorites]);

  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  // ORDERS

  const createOrder = ({
    customer,
    paymentMethod,
    shipping = 0,
  }) => {
    if (!cartItems.length) {
      return null;
    }

    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      cartKey: item.cartKey,
      title: item.title,
      brand: item.brand,
      image: item.image,

      quantity: item.quantity,
      price: item.price,
      oldPrice: item.oldPrice,
      subtotal: item.price * item.quantity,

      seller:
        item.selectedOffer?.seller ||
        item.brand ||
        "ShopFlow",

      offerId: item.selectedOffer?.id || null,

      verified: item.selectedOffer?.verified || false,

      delivery: item.selectedOffer?.delivery || null,

      shipping: Number(item.selectedOffer?.shipping || 0),
    }));

    const orderSubtotal = orderItems.reduce(
      (total, item) => total + item.subtotal,
      0,
    );

    const calculatedShipping = Number(shipping || 0);

    const total = orderSubtotal + calculatedShipping;

    const newOrder = {
      id: generateOrderId(),
      status: "processing",
      createdAt: new Date().toISOString(),
      cancelledAt: null,

      paymentMethod,
      customer,
      items: orderItems,

      subtotal: orderSubtotal,
      shipping: calculatedShipping,
      total,
    };

    const nextOrders = [newOrder, ...orders];

    saveOrders(nextOrders);

    return newOrder;
  };

  const cancelOrder = (orderId) => {
    const nextOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: "cancelled",
            cancelledAt: new Date().toISOString(),
          }
        : order,
    );

    saveOrders(nextOrders);
    showToast("Order cancelled");
  };

  const getOrderById = (orderId) =>
    orders.find((order) => order.id === orderId) || null;

  const reorderOrder = (orderId) => {
    const order = getOrderById(orderId);

    if (!order) return;

    let nextCart = [...cart];

    order.items.forEach((orderItem) => {
      const product = products.find(
        (item) => item.id === orderItem.productId,
      );

      if (!product) {
        return;
      }

      const offer = product.offers?.find(
        (item) => item.id === orderItem.offerId,
      );

      const cartProduct = {
        ...product,

        selectedOffer: offer ? { ...offer } : null,

        price: offer?.price ?? product.price,

        oldPrice: offer?.oldPrice ?? product.oldPrice,

        stock: offer?.stock ?? product.stock,
      };

      const cartKey = getCartKey(cartProduct);

      const existingIndex = nextCart.findIndex(
        (item) => item.cartKey === cartKey,
      );

      if (existingIndex >= 0) {
        nextCart = nextCart.map((item, index) =>
          index === existingIndex
            ? {
                ...item,
                quantity: item.quantity + orderItem.quantity,
              }
            : item,
        );
      } else {
        nextCart = [
          ...nextCart,
          {
            cartKey,
            productId: product.id,
            quantity: orderItem.quantity,

            selectedOffer: offer ? { ...offer } : null,

            price: offer?.price ?? product.price,

            oldPrice: offer?.oldPrice ?? product.oldPrice,

            stock: offer?.stock ?? product.stock,
          },
        ];
      }
    });

    saveCart(nextCart);

    // Deschide automat cosul si dupa "Cumpara din nou".
    setIsCartOpen(true);

    showToast(t("toast.addedToCart"));
  };

  const activeOrders = useMemo(() => {
    return orders.filter(
      (order) => order.status !== "cancelled",
    );
  }, [orders]);

  const cancelledOrders = useMemo(() => {
    return orders.filter(
      (order) => order.status === "cancelled",
    );
  }, [orders]);

  const value = {
    cart,
    cartItems,
    cartCount,
    cartSubtotal,

    favorites,
    favoriteProducts,

    orders,
    activeOrders,
    cancelledOrders,

    isCartOpen,
    searchQuery,
    toast,

    setSearchQuery,
    setIsCartOpen,

    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,

    toggleFavorite,
    isFavorite,

    createOrder,
    cancelOrder,
    getOrderById,
    reorderOrder,

    showToast,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error(
      "useShop must be used inside ShopProvider",
    );
  }

  return context;
}