
import {
  ArrowRight,
  Ban,
  CheckCircle2,
  Clock3,
  Heart,
  History,
  Package,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  Store,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import { useShop } from "../context/ShopContext";

function Account() {
  const { language, t } = useLanguage();

  const {
    orders,
    activeOrders,
    cancelledOrders,
    favoriteProducts,
    cancelOrder,
    reorderOrder,
  } = useShop();

  const ro = language === "ro";

  const [activeTab, setActiveTab] = useState("overview");
  const [orderToCancel, setOrderToCancel] = useState(null);

  const formatPrice = (price = 0) =>
    new Intl.NumberFormat(ro ? "ro-RO" : "en-US", {
      style: "currency",
      currency: "RON",
      maximumFractionDigits: 2,
    }).format(Number(price) || 0);

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return new Intl.DateTimeFormat(ro ? "ro-RO" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(parsedDate);
  };

  const text = {
    dashboard: ro
      ? "Centrul tău ShopFlow"
      : "Your ShopFlow hub",

    subtitle: ro
      ? "Controlează comenzile, favoritele și experiența ta marketplace dintr-un singur loc."
      : "Control your orders, favorites and marketplace experience from one place.",

    overview: ro ? "Prezentare" : "Overview",
    orders: ro ? "Comenzi" : "Orders",
    cancelled: ro ? "Anulate" : "Cancelled",
    favorites: ro ? "Favorite" : "Favorites",

    activeOrders: ro ? "Comenzi active" : "Active orders",
    savedProducts: ro ? "Produse salvate" : "Saved products",
    security: ro ? "Protecție" : "Security",
    protected: ro ? "Protejat" : "Protected",

    recentOrders: ro ? "Comenzi recente" : "Recent orders",
    latestActivity: ro ? "Activitate recentă" : "Latest activity",
    allOrders: ro ? "Toate comenzile" : "All orders",
    cancelledOrders: ro ? "Comenzi anulate" : "Cancelled orders",

    noOrders: ro
      ? "Nu ai comenzi active momentan."
      : "You don't have any active orders right now.",

    noRecentOrders: ro
      ? "Nu ai plasat încă nicio comandă."
      : "You haven't placed any orders yet.",

    noCancelled: ro
      ? "Nu ai comenzi anulate."
      : "You don't have any cancelled orders.",

    noFavorites: ro
      ? "Nu ai produse salvate momentan."
      : "You don't have any saved products yet.",

    explore: ro ? "Explorează produsele" : "Explore products",
    seller: ro ? "Vândut de" : "Sold by",
    quantity: ro ? "Cantitate" : "Quantity",
    orderTotal: ro ? "Total comandă" : "Order total",
    products: ro ? "Produse" : "Products",
    sellers: ro ? "Selleri" : "Sellers",
    placed: ro ? "Plasată" : "Placed",
    processing: ro ? "În procesare" : "Processing",
    cancelledStatus: ro ? "Anulată" : "Cancelled",

    buyAgain: ro ? "Cumpără din nou" : "Buy again",
    cancel: ro ? "Anulează comanda" : "Cancel order",
    viewProduct: ro ? "Vezi produsul" : "View product",

    viewFavorites: ro
      ? "Vezi toate favoritele"
      : "View all favorites",

    accountStatus: ro
      ? "Cont demo ShopFlow • Date salvate local"
      : "ShopFlow demo account • Data stored locally",

    secureTitle: "ShopFlow Protection",

    secureDescription: ro
      ? "Comenzile și preferințele tale sunt păstrate local pentru această experiență demonstrativă."
      : "Your orders and preferences are stored locally for this demo experience.",

    orderHistory: ro ? "Istoric comenzi" : "Order history",
    marketplaceAccount: "Marketplace Account",
    cancelledAt: ro ? "Anulată la" : "Cancelled at",

    modalEyebrow: ro
      ? "CONFIRMARE COMANDĂ"
      : "ORDER CONFIRMATION",

    modalTitle: ro
      ? "Anulezi această comandă?"
      : "Cancel this order?",

    modalDescription: ro
      ? "Comanda va fi mutată în istoricul comenzilor anulate. O vei putea consulta în continuare și vei putea adăuga din nou produsele în coș."
      : "The order will move to your cancelled order history. You can still view it and add its products to your cart again.",

    keepOrder: ro ? "Păstrează comanda" : "Keep order",

    confirmCancellation: ro
      ? "Confirmă anularea"
      : "Confirm cancellation",

    demoNotice: ro
      ? "Această acțiune modifică doar comanda demonstrativă salvată în browser."
      : "This action only changes the demo order stored in your browser.",

    closeModal: ro ? "Închide fereastra" : "Close dialog",
  };

  const recentOrders = useMemo(
    () => orders.slice(0, 3),
    [orders],
  );

  const tabs = [
    {
      id: "overview",
      label: text.overview,
      icon: UserRound,
    },
    {
      id: "orders",
      label: text.orders,
      icon: Package,
      count: activeOrders.length,
    },
    {
      id: "cancelled",
      label: text.cancelled,
      icon: Ban,
      count: cancelledOrders.length,
    },
    {
      id: "favorites",
      label: text.favorites,
      icon: Heart,
      count: favoriteProducts.length,
    },
  ];

  useEffect(() => {
    if (!orderToCancel) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOrderToCancel(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [orderToCancel]);

  const openCancelModal = (order) => {
    if (order.status === "cancelled") return;

    setOrderToCancel(order);
  };

  const closeCancelModal = () => {
    setOrderToCancel(null);
  };

  const confirmCancelOrder = () => {
    if (!orderToCancel) return;

    const orderId = orderToCancel.id;

    closeCancelModal();
    cancelOrder(orderId);
  };

  const getSellerCount = (order) =>
    new Set(
      (order.items || []).map((item) => item.seller),
    ).size;

  const getProductCount = (order) =>
    (order.items || []).reduce(
      (total, item) => total + Number(item.quantity || 0),
      0,
    );

  const OrderStatus = ({ status }) => {
    const isCancelled = status === "cancelled";

    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black ${
          isCancelled
            ? "border-red-400/15 bg-red-400/[0.06] text-red-300"
            : "border-emerald-400/15 bg-emerald-400/[0.06] text-emerald-400"
        }`}
      >
        {isCancelled ? (
          <XCircle size={13} />
        ) : (
          <Clock3 size={13} />
        )}

        {isCancelled
          ? text.cancelledStatus
          : text.processing}
      </span>
    );
  };

  const OrderCard = ({ order, compact = false }) => {
    const sellerCount = getSellerCount(order);
    const productCount = getProductCount(order);

    const visibleItems = compact
      ? (order.items || []).slice(0, 2)
      : order.items || [];

    return (
      <article className="group overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#101316] transition hover:border-white/[0.12]">
        {/* ORDER HEADER */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.06] p-5 md:p-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <p className="break-all text-lg font-black">
                {order.id}
              </p>

              <OrderStatus status={order.status} />
            </div>

            <p className="mt-2 text-xs text-zinc-500">
              {text.placed}: {formatDate(order.createdAt)}
            </p>

            {order.status === "cancelled" &&
              order.cancelledAt && (
                <p className="mt-1 text-xs text-red-300/60">
                  {text.cancelledAt}:{" "}
                  {formatDate(order.cancelledAt)}
                </p>
              )}
          </div>

          <div className="sm:text-right">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-600">
              {text.orderTotal}
            </p>

            <p className="mt-1 text-xl font-black">
              {formatPrice(order.total)}
            </p>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="grid gap-3 border-b border-white/[0.06] bg-black/10 px-5 py-4 sm:grid-cols-3 md:px-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-600">
              {text.products}
            </p>

            <p className="mt-1 font-black">
              {productCount}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-600">
              {text.sellers}
            </p>

            <p className="mt-1 font-black">
              {sellerCount}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-600">
              {ro ? "Plată" : "Payment"}
            </p>

            <p className="mt-1 font-black">
              {order.paymentMethod === "cash"
                ? ro
                  ? "La livrare"
                  : "Cash"
                : "Card"}
            </p>
          </div>
        </div>

        {/* ORDER PRODUCTS */}
        <div className="space-y-3 p-5 md:p-6">
          {visibleItems.map((item, index) => (
            <div
              key={`${order.id}-${item.cartKey || index}`}
              className="flex min-w-0 flex-wrap gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3 sm:flex-nowrap"
            >
              <Link
                to={`/products/${item.productId}`}
                className="shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 rounded-xl object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  to={`/products/${item.productId}`}
                  className="line-clamp-2 font-black transition hover:text-emerald-400"
                >
                  {item.title}
                </Link>

                <p className="mt-1 text-xs text-zinc-500">
                  {text.seller}{" "}
                  <span className="font-bold text-zinc-400">
                    {item.seller}
                  </span>
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  {text.quantity}: {item.quantity}
                </p>
              </div>

              <div className="min-w-0 text-right">
                <p className="font-black">
                  {formatPrice(
                    Number(item.price || 0) *
                      Number(item.quantity || 0),
                  )}
                </p>

                <Link
                  to={`/products/${item.productId}`}
                  className="mt-2 inline-block text-[10px] font-black uppercase tracking-wider text-emerald-400/70 transition hover:text-emerald-400"
                >
                  {text.viewProduct}
                </Link>
              </div>
            </div>
          ))}

          {compact && (order.items || []).length > 2 && (
            <p className="text-center text-xs font-bold text-zinc-600">
              +{order.items.length - 2}{" "}
              {ro ? "produse" : "more products"}
            </p>
          )}
        </div>

        {/* ORDER ACTIONS */}
        <div className="flex flex-wrap gap-3 border-t border-white/[0.06] bg-black/20 px-5 py-4 md:px-6">
          <button
            type="button"
            onClick={() => reorderOrder(order.id)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-black text-black transition hover:bg-emerald-300"
          >
            <RefreshCcw size={15} />
            {text.buyAgain}
          </button>

          {order.status !== "cancelled" && (
            <button
              type="button"
              onClick={() => openCancelModal(order)}
              className="inline-flex items-center gap-2 rounded-xl border border-red-400/15 bg-red-400/[0.04] px-4 py-2.5 text-sm font-black text-red-300 transition hover:border-red-400/30 hover:bg-red-400/[0.08]"
            >
              <Ban size={15} />
              {text.cancel}
            </button>
          )}
        </div>
      </article>
    );
  };

  const EmptyState = ({ icon: Icon, title, action }) => (
    <div className="mt-6 flex flex-col items-center rounded-[28px] border border-dashed border-white/10 bg-white/[0.015] px-6 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full border border-white/[0.07] bg-white/[0.03] text-zinc-600">
        <Icon size={26} />
      </div>

      <p className="mt-5 font-black text-zinc-400">
        {title}
      </p>

      <Link
        to="/products"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-black text-black transition hover:bg-emerald-300"
      >
        <ShoppingBag size={16} />
        {action}
      </Link>
    </div>
  );

  return (
    <main className="mx-auto min-h-[75vh] w-full max-w-[1500px] min-w-0 px-4 py-10 md:px-6 md:py-12">
      {/* ACCOUNT HERO */}
      <section className="relative overflow-hidden rounded-[36px] border border-white/[0.07] bg-[#101316] p-6 md:p-8">
        <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-emerald-400/[0.07] blur-[110px]" />

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="flex min-w-0 items-center gap-5">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[22px] bg-emerald-400 text-black sm:h-20 sm:w-20">
              <UserRound size={32} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
                {text.marketplaceAccount}
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                {t("account.title")}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                {text.subtitle}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] px-5 py-4">
            <div className="flex items-center gap-3">
              <ShieldCheck
                size={20}
                className="shrink-0 text-emerald-400"
              />

              <div>
                <p className="text-sm font-black">
                  {text.secureTitle}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {text.accountStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCOUNT STATS */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          className="rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-5 text-left transition hover:border-emerald-400/20 hover:bg-emerald-400/[0.025]"
        >
          <div className="flex items-center justify-between">
            <Package size={20} className="text-emerald-400" />
            <ArrowRight size={16} className="text-zinc-700" />
          </div>

          <p className="mt-6 text-3xl font-black">
            {activeOrders.length}
          </p>

          <p className="mt-1 text-sm font-bold text-zinc-500">
            {text.activeOrders}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cancelled")}
          className="rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-5 text-left transition hover:border-red-400/20 hover:bg-red-400/[0.02]"
        >
          <div className="flex items-center justify-between">
            <XCircle size={20} className="text-red-300" />
            <ArrowRight size={16} className="text-zinc-700" />
          </div>

          <p className="mt-6 text-3xl font-black">
            {cancelledOrders.length}
          </p>

          <p className="mt-1 text-sm font-bold text-zinc-500">
            {text.cancelled}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("favorites")}
          className="rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-5 text-left transition hover:border-emerald-400/20 hover:bg-emerald-400/[0.025]"
        >
          <div className="flex items-center justify-between">
            <Heart size={20} className="text-emerald-400" />
            <ArrowRight size={16} className="text-zinc-700" />
          </div>

          <p className="mt-6 text-3xl font-black">
            {favoriteProducts.length}
          </p>

          <p className="mt-1 text-sm font-bold text-zinc-500">
            {text.savedProducts}
          </p>
        </button>

        <div className="rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-5">
          <ShieldCheck size={20} className="text-emerald-400" />

          <p className="mt-6 text-xl font-black text-emerald-400">
            {text.protected}
          </p>

          <p className="mt-1 text-sm font-bold text-zinc-500">
            {text.security}
          </p>
        </div>
      </section>

      {/* ACCOUNT TABS */}
      <section className="mt-8">
        <div className="flex gap-2 overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-black transition ${
                  activeTab === tab.id
                    ? "bg-emerald-400 text-black"
                    : "text-zinc-500 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon size={16} />

                {tab.label}

                {typeof tab.count === "number" && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      activeTab === tab.id
                        ? "bg-black/15"
                        : "bg-white/[0.06]"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <section className="min-w-0">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
                    {text.latestActivity}
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    {text.recentOrders}
                  </h2>
                </div>

                {orders.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("orders")}
                    className="text-sm font-black text-zinc-500 transition hover:text-emerald-400"
                  >
                    {text.orderHistory}
                  </button>
                )}
              </div>

              {recentOrders.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {recentOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      compact
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Package}
                  title={text.noRecentOrders}
                  action={text.explore}
                />
              )}
            </section>

            <aside className="min-w-0 space-y-4">
              <div className="rounded-[28px] border border-white/[0.07] bg-[#101316] p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-400/10 text-emerald-400">
                    <History size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-600">
                      ShopFlow
                    </p>

                    <h3 className="font-black">
                      {text.orderHistory}
                    </h3>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">
                      {text.orders}
                    </span>

                    <strong>{orders.length}</strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">
                      {text.activeOrders}
                    </span>

                    <strong className="text-emerald-400">
                      {activeOrders.length}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">
                      {text.cancelled}
                    </span>

                    <strong className="text-red-300">
                      {cancelledOrders.length}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-emerald-400/10 bg-emerald-400/[0.035] p-6">
                <ShieldCheck
                  size={22}
                  className="text-emerald-400"
                />

                <h3 className="mt-5 font-black">
                  {text.secureTitle}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {text.secureDescription}
                </p>
              </div>
            </aside>
          </div>
        )}

        {/* ACTIVE ORDERS */}
        {activeTab === "orders" && (
          <section className="mt-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
              ShopFlow Marketplace
            </p>

            <h2 className="mt-2 text-3xl font-black">
              {text.allOrders}
            </h2>

            {activeOrders.length > 0 ? (
              <div className="mt-6 space-y-4">
                {activeOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Package}
                title={text.noOrders}
                action={text.explore}
              />
            )}
          </section>
        )}

        {/* CANCELLED ORDERS */}
        {activeTab === "cancelled" && (
          <section className="mt-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-300">
              ShopFlow Archive
            </p>

            <h2 className="mt-2 text-3xl font-black">
              {text.cancelledOrders}
            </h2>

            {cancelledOrders.length > 0 ? (
              <div className="mt-6 space-y-4">
                {cancelledOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={CheckCircle2}
                title={text.noCancelled}
                action={text.explore}
              />
            )}
          </section>
        )}

        {/* FAVORITES */}
        {activeTab === "favorites" && (
          <section className="mt-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
                  ShopFlow Collection
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  {text.favorites}
                </h2>
              </div>

              <Link
                to="/favorites"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-black transition hover:border-emerald-400/20 hover:text-emerald-400"
              >
                {text.viewFavorites}
                <ArrowRight size={15} />
              </Link>
            </div>

            {favoriteProducts.length > 0 ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {favoriteProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="group overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#101316] transition hover:border-emerald-400/20"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-white/[0.03]">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-black uppercase tracking-wider text-emerald-400">
                        {product.brand}
                      </p>

                      <h3 className="mt-2 line-clamp-2 text-lg font-black transition group-hover:text-emerald-400">
                        {product.title}
                      </h3>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="font-black">
                          {formatPrice(product.price)}
                        </span>

                        <ArrowRight
                          size={17}
                          className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-emerald-400"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Heart}
                title={text.noFavorites}
                action={text.explore}
              />
            )}
          </section>
        )}
      </section>

      {/* CUSTOM CANCEL ORDER MODAL */}
      {orderToCancel && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeCancelModal();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-order-title"
            aria-describedby="cancel-order-description"
            className="relative my-auto w-full max-w-[480px] overflow-hidden rounded-[30px] border border-white/10 bg-[#121719] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.7)] sm:p-8"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-red-400/[0.07] blur-[70px]" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-red-400/20 bg-red-400/[0.08] text-red-300">
                  <Ban size={25} />
                </div>

                <button
                  type="button"
                  onClick={closeCancelModal}
                  aria-label={text.closeModal}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
                >
                  <X size={19} />
                </button>
              </div>

              <p className="mt-6 text-[11px] font-black uppercase tracking-[0.2em] text-red-300">
                {text.modalEyebrow}
              </p>

              <h2
                id="cancel-order-title"
                className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl"
              >
                {text.modalTitle}
              </h2>

              <p
                id="cancel-order-description"
                className="mt-4 text-sm leading-7 text-zinc-400"
              >
                {text.modalDescription}
              </p>

              <div className="mt-6 rounded-2xl border border-white/[0.08] bg-black/20 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                      {ro ? "Număr comandă" : "Order number"}
                    </p>

                    <p className="mt-1 break-all text-sm font-black text-white">
                      {orderToCancel.id}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                      {text.orderTotal}
                    </p>

                    <p className="mt-1 text-lg font-black text-white">
                      {formatPrice(orderToCancel.total)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-white/[0.07] pt-4 text-xs text-zinc-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Package size={14} className="text-emerald-400" />
                    {getProductCount(orderToCancel)} {text.products.toLowerCase()}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Store size={14} className="text-emerald-400" />
                    {getSellerCount(orderToCancel)} {text.sellers.toLowerCase()}
                  </span>
                </div>
              </div>

              <p className="mt-5 text-xs leading-5 text-zinc-500">
                {text.demoNotice}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={closeCancelModal}
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-black text-white transition hover:bg-white/[0.1]"
                >
                  {text.keepOrder}
                </button>

                <button
                  type="button"
                  onClick={confirmCancelOrder}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-red-400 px-4 py-3 text-sm font-black text-[#1a0b0d] transition hover:bg-red-300"
                >
                  <Ban size={16} />
                  {text.confirmCancellation}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Account;