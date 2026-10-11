import {
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Store,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useShop } from "../context/ShopContext";

function CartDrawer() {
  const navigate = useNavigate();
  const { language, t } =
    useLanguage();

  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
  } = useShop();

  const formatPrice = (price = 0) =>
    new Intl.NumberFormat(
      language === "ro"
        ? "ro-RO"
        : "en-US",
      {
        style: "currency",
        currency: "RON",
        maximumFractionDigits: 0,
      }
    ).format(price);

  if (!isCartOpen) return null;

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const goToCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  const text = {
    soldBy:
      language === "ro"
        ? "Vândut de"
        : "Sold by",

    verified:
      language === "ro"
        ? "Seller verificat"
        : "Verified seller",

    inStock:
      language === "ro"
        ? "În stoc"
        : "In stock",

    freeDelivery:
      language === "ro"
        ? "Livrare gratuită"
        : "Free delivery",

    shipping:
      language === "ro"
        ? "Transport"
        : "Shipping",

    maxStock:
      language === "ro"
        ? "Ai atins stocul maxim disponibil."
        : "Maximum available stock reached.",

    total:
      language === "ro"
        ? "Total"
        : "Total",
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* BACKDROP */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* DRAWER */}
      <aside
        className="
          absolute right-0 top-0
          flex h-[100dvh] w-full flex-col
          border-l border-white/10
          bg-[#0c0f11]
          shadow-2xl

          sm:w-[92vw]
          sm:max-w-[520px]

          lg:w-[500px]
        "
      >
        {/* HEADER */}
        <div
          className="
            flex shrink-0 items-center justify-between
            border-b border-white/[0.07]
            px-4 py-4
            sm:px-5 sm:py-5
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400/10 text-emerald-400">
              <ShoppingBag size={19} />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-black sm:text-xl">
                {t("cart.title")}
              </h2>

              <p className="mt-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-600 sm:hidden">
                ShopFlow Marketplace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
            aria-label="Close cart"
          >
            <X size={19} />
          </button>
        </div>

        {/* EMPTY */}
        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-white/[0.04] text-zinc-600">
              <ShoppingBag size={30} />
            </div>

            <p className="mt-5 font-bold text-zinc-400">
              {t("cart.empty")}
            </p>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            <div
              className="
                flex-1 space-y-3 overflow-y-auto
                overscroll-contain
                p-3
                sm:space-y-4 sm:p-4
              "
            >
              {cartItems.map((item) => {
                const offer =
                  item.selectedOffer;

                const seller =
                  offer?.seller ||
                  item.brand;

                const verified =
                  offer?.verified ||
                  false;

                const deliveryLabel =
                  offer?.delivery?.label?.[
                    language
                  ] || null;

                const shipping =
                  Number(
                    offer?.shipping || 0
                  );

                const maxStock =
                  Number(
                    offer?.stock ??
                      item.stock ??
                      0
                  );

                const atMaxStock =
                  maxStock > 0 &&
                  item.quantity >=
                    maxStock;

                return (
                  <article
                    key={item.cartKey}
                    className="
                      rounded-[20px]
                      border border-white/[0.07]
                      bg-white/[0.035]
                      p-3
                      sm:rounded-[22px]
                      sm:p-3.5
                    "
                  >
                    {/* PRODUCT TOP */}
                    <div className="flex gap-3">
                      {/* CLICKABLE IMAGE */}
                      <Link
                        to={`/products/${item.id}`}
                        onClick={closeCart}
                        aria-label={
                          item.title
                        }
                        className="
                          group/image
                          h-20 w-20
                          shrink-0
                          overflow-hidden
                          rounded-2xl
                          bg-white/[0.04]
                          sm:h-24 sm:w-24
                        "
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="
                            h-full w-full
                            object-cover
                            transition
                            duration-300
                            group-hover/image:scale-105
                          "
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        {/* CLICKABLE TITLE */}
                        <Link
                          to={`/products/${item.id}`}
                          onClick={closeCart}
                          className="
                            block
                            truncate
                            text-sm
                            font-black
                            transition
                            hover:text-emerald-400
                          "
                        >
                          {item.title}
                        </Link>

                        <p className="mt-1 text-base font-black text-emerald-400 sm:text-lg">
                          {formatPrice(
                            item.price
                          )}
                        </p>

                        {/* SELLER */}
                        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs">
                          <div className="flex min-w-0 items-center gap-1.5 text-zinc-500">
                            <Store
                              size={13}
                              className="shrink-0"
                            />

                            <span className="shrink-0">
                              {text.soldBy}
                            </span>

                            <strong className="truncate text-zinc-300">
                              {seller}
                            </strong>
                          </div>

                          {verified && (
                            <div className="flex shrink-0 items-center gap-1 text-emerald-400">
                              <ShieldCheck
                                size={13}
                              />

                              <span className="font-bold">
                                {
                                  text.verified
                                }
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(
                            item.cartKey
                          )
                        }
                        className="
                          grid h-8 w-8
                          shrink-0
                          place-items-center
                          self-start
                          rounded-lg
                          text-zinc-600
                          transition
                          hover:bg-red-400/[0.06]
                          hover:text-red-400
                        "
                        aria-label="Remove"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    {/* MARKETPLACE INFO */}
                    <div className="mt-3 grid gap-2 rounded-xl border border-white/[0.05] bg-black/20 p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-[11px] font-black text-emerald-400">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />

                          {text.inStock}

                          {maxStock > 0 && (
                            <span className="text-zinc-600">
                              • {maxStock}
                            </span>
                          )}
                        </div>

                        {deliveryLabel && (
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 sm:text-[11px]">
                            <Truck
                              size={13}
                              className="shrink-0"
                            />

                            <span>
                              {
                                deliveryLabel
                              }
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="text-[11px] font-bold text-zinc-500">
                        {shipping === 0
                          ? text.freeDelivery
                          : `${
                              text.shipping
                            }: ${formatPrice(
                              shipping
                            )}`}
                      </div>
                    </div>

                    {/* QUANTITY / TOTAL */}
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex w-fit items-center rounded-xl border border-white/10 bg-black/20">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.cartKey,
                                item.quantity -
                                  1
                              )
                            }
                            className="
                              grid h-10 w-10
                              place-items-center
                              text-zinc-400
                              transition
                              hover:text-white
                            "
                            aria-label="Decrease quantity"
                          >
                            <Minus
                              size={14}
                            />
                          </button>

                          <span className="w-9 text-center text-xs font-black">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            disabled={
                              atMaxStock
                            }
                            onClick={() =>
                              updateQuantity(
                                item.cartKey,
                                item.quantity +
                                  1
                              )
                            }
                            className="
                              grid h-10 w-10
                              place-items-center
                              text-zinc-400
                              transition
                              hover:text-white
                              disabled:cursor-not-allowed
                              disabled:text-zinc-700
                            "
                            aria-label="Increase quantity"
                          >
                            <Plus
                              size={14}
                            />
                          </button>
                        </div>

                        {atMaxStock && (
                          <p className="mt-1.5 max-w-[190px] text-[10px] font-bold leading-4 text-amber-400">
                            {text.maxStock}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-600 sm:text-[10px]">
                          {text.total}
                        </p>

                        <p className="mt-1 text-sm font-black sm:text-base">
                          {formatPrice(
                            item.price *
                              item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* SUMMARY */}
            <div
              className="
                shrink-0
                border-t border-white/[0.07]
                bg-[#0c0f11]
                px-4 pb-[max(16px,env(safe-area-inset-bottom))]
                pt-4
                sm:p-5
              "
            >
              <div className="mb-4 flex items-center justify-between sm:mb-5">
                <span className="text-sm text-zinc-400 sm:text-base">
                  {t("cart.subtotal")}
                </span>

                <strong className="text-lg sm:text-xl">
                  {formatPrice(
                    cartSubtotal
                  )}
                </strong>
              </div>

              <button
                type="button"
                onClick={goToCheckout}
                className="
                  w-full
                  rounded-2xl
                  bg-emerald-400
                  py-3.5
                  font-black
                  text-black
                  transition
                  hover:bg-emerald-300
                  sm:py-4
                "
              >
                {t("cart.checkout")}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;