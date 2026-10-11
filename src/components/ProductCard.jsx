import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Heart,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  TrendingDown,
  Truck,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useShop } from "../context/ShopContext";

function ProductCard({ product }) {
  const { language, t } = useLanguage();

  const {
    addToCart,
    toggleFavorite,
    isFavorite,
  } = useShop();

  const [imageError, setImageError] =
    useState(false);

  const favorite = isFavorite(product.id);

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

  /*
   * ---------------------------------------------------------
   * MARKETPLACE OFFER ENGINE
   * ---------------------------------------------------------
   * Alegem doar sellerii care au produsul în stoc.
   * Best offer = preț produs + transport.
   */

  const availableOffers = Array.isArray(
    product.offers
  )
    ? product.offers.filter(
        (offer) =>
          Number(offer.stock) > 0
      )
    : [];

  const sortedOffers = [
    ...availableOffers,
  ].sort((a, b) => {
    const totalA =
      Number(a.price || 0) +
      Number(a.shipping || 0);

    const totalB =
      Number(b.price || 0) +
      Number(b.shipping || 0);

    return totalA - totalB;
  });

  const bestOffer =
    sortedOffers[0] || {
      seller: product.brand,
      price: product.price,
      oldPrice: product.oldPrice,
      stock: product.stock,
      rating: product.rating,
      verified: false,
      shipping: 0,
      delivery: null,
    };

  const currentPrice =
    bestOffer?.price ?? product.price;

  const currentOldPrice =
    bestOffer?.oldPrice ??
    product.oldPrice ??
    currentPrice;

  const currentStock =
    bestOffer?.stock ??
    product.stock ??
    0;

  const discount =
    currentOldPrice > currentPrice
      ? Math.round(
          ((currentOldPrice -
            currentPrice) /
            currentOldPrice) *
            100
        )
      : 0;

  const totalOffers = Array.isArray(
    product.offers
  )
    ? product.offers.length
    : 1;

  const isAvailable =
    currentStock > 0;

  const lowStock =
    currentStock > 0 &&
    currentStock <= 5;

  const deliveryLabel =
    bestOffer?.delivery?.label?.[
      language
    ] || null;

  /*
   * Produsul introdus în coș păstrează
   * sellerul / oferta selectată.
   */

  const cartProduct = {
    ...product,

    price: currentPrice,
    oldPrice: currentOldPrice,
    stock: currentStock,

    selectedOffer: {
      ...bestOffer,
    },
  };

  /*
   * ---------------------------------------------------------
   * SHOPFLOW VALUE SCORE
   * ---------------------------------------------------------
   * Este momentan un indicator DEMO calculat local.
   * Nu pretindem că reprezintă date live.
   */

  const valueScore = useMemo(() => {
    let score = 70;

    if (discount >= 20) {
      score += 12;
    } else if (discount >= 10) {
      score += 8;
    } else if (discount > 0) {
      score += 4;
    }

    if (
      Number(bestOffer.rating || 0) >=
      4.8
    ) {
      score += 7;
    } else if (
      Number(bestOffer.rating || 0) >=
      4.5
    ) {
      score += 4;
    }

    if (bestOffer.verified) {
      score += 5;
    }

    if (
      Number(bestOffer.shipping || 0) ===
      0
    ) {
      score += 4;
    }

    if (availableOffers.length >= 2) {
      score += 3;
    }

    return Math.min(score, 98);
  }, [
    discount,
    bestOffer,
    availableOffers.length,
  ]);

  const scoreState =
    valueScore >= 90
      ? "excellent"
      : valueScore >= 82
        ? "great"
        : "good";

  const text = {
    bestPrice:
      language === "ro"
        ? "BEST AVAILABLE"
        : "BEST AVAILABLE",

    verified:
      language === "ro"
        ? "Seller verificat"
        : "Verified seller",

    inStock:
      language === "ro"
        ? "În stoc"
        : "In stock",

    outOfStock:
      language === "ro"
        ? "Stoc epuizat"
        : "Out of stock",

    only:
      language === "ro"
        ? "Doar"
        : "Only",

    left:
      language === "ro"
        ? "rămase"
        : "left",

    offer:
      language === "ro"
        ? "ofertă"
        : "offer",

    offers:
      language === "ro"
        ? "oferte"
        : "offers",

    freeDelivery:
      language === "ro"
        ? "Livrare gratuită"
        : "Free delivery",

    shipping:
      language === "ro"
        ? "Transport"
        : "Shipping",

    imageUnavailable:
      language === "ro"
        ? "Imagine indisponibilă"
        : "Image unavailable",

    valueScore:
      language === "ro"
        ? "Value Score"
        : "Value Score",

    excellent:
      language === "ro"
        ? "Excelent"
        : "Excellent",

    great:
      language === "ro"
        ? "Foarte bun"
        : "Great value",

    good:
      language === "ro"
        ? "Bun"
        : "Good value",

    compare:
      language === "ro"
        ? "Compară"
        : "Compare",

    priceDrop:
      language === "ro"
        ? "Price drop"
        : "Price drop",

    seller:
      language === "ro"
        ? "Seller"
        : "Seller",

    intelligence:
      language === "ro"
        ? "ShopFlow Intelligence"
        : "ShopFlow Intelligence",

    demo:
      language === "ro"
        ? "Scor demonstrativ"
        : "Demo score",
  };

  const scoreLabel =
    text[scoreState];

  return (
    <article
      className="
        group
        relative
        flex h-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-[26px]
        border border-white/[0.07]
        bg-[#0d1215]
        shadow-[0_18px_55px_rgba(0,0,0,0.16)]
        transition
        duration-300

        hover:border-emerald-400/[0.16]
        hover:shadow-[0_24px_65px_rgba(0,0,0,0.28),0_0_35px_rgba(32,227,162,0.025)]

        sm:rounded-[28px]
      "
    >
      {/* =====================================================
          IMAGE
         ===================================================== */}

      <div className="relative overflow-hidden bg-[#e9ebeb]">
        <Link
          to={`/products/${product.id}`}
          className="block overflow-hidden"
        >
          {!imageError ? (
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              onError={() =>
                setImageError(true)
              }
              className="
                h-[220px]
                w-full
                object-cover
                transition
                duration-500
                ease-out

                group-hover:scale-[1.035]

                sm:h-[240px]
                xl:h-[255px]
              "
            />
          ) : (
            <div
              className="
                flex h-[220px]
                flex-col
                items-center
                justify-center
                gap-3
                bg-[#151a1e]
                text-zinc-600

                sm:h-[240px]
                xl:h-[255px]
              "
            >
              <PackageCheck size={38} />

              <span className="text-[10px] font-black uppercase tracking-[0.16em]">
                {text.imageUnavailable}
              </span>
            </div>
          )}
        </Link>

        {/* TOP LEFT INTELLIGENCE */}

        <div className="absolute left-3 top-3 flex max-w-[72%] flex-wrap gap-1.5 sm:left-4 sm:top-4">
          {discount > 0 && (
            <div
              className="
                inline-flex
                items-center gap-1.5
                rounded-full
                border border-emerald-300/20
                bg-[#07110e]/90
                px-2.5 py-1.5
                text-[9px]
                font-black
                uppercase
                tracking-[0.08em]
                text-emerald-300
                shadow-lg
                backdrop-blur-xl
              "
            >
              <TrendingDown size={11} />

              -{discount}%
            </div>
          )}

          {product.badge && (
            <div
              className="
                hidden
                rounded-full
                border border-white/10
                bg-black/70
                px-2.5 py-1.5
                text-[9px]
                font-black
                uppercase
                tracking-[0.08em]
                text-white
                backdrop-blur-xl

                sm:block
              "
            >
              {product.badge}
            </div>
          )}
        </div>

        {/* FAVORITE */}

        <button
          type="button"
          onClick={() =>
            toggleFavorite(product)
          }
          className={`
            absolute right-3 top-3
            grid h-10 w-10
            place-items-center
            rounded-full
            border
            shadow-xl
            backdrop-blur-xl
            transition
            duration-200

            sm:right-4
            sm:top-4

            ${
              favorite
                ? "border-emerald-300/40 bg-emerald-400 text-black"
                : "border-white/15 bg-black/55 text-white hover:border-emerald-400/30 hover:bg-black/75"
            }
          `}
          aria-label="Favorite"
        >
          <Heart
            size={17}
            fill={
              favorite
                ? "currentColor"
                : "none"
            }
          />
        </button>

        {/* BEST AVAILABLE */}

        {availableOffers.length > 1 &&
          isAvailable && (
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
              <div
                className="
                  inline-flex
                  items-center gap-1.5
                  rounded-full
                  border border-emerald-300/20
                  bg-emerald-400/95
                  px-2.5 py-1.5
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.08em]
                  text-black
                  shadow-xl
                  backdrop-blur-xl
                "
              >
                <Zap size={11} />
                {text.bestPrice}
              </div>
            </div>
          )}
      </div>

      {/* =====================================================
          CONTENT
         ===================================================== */}

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* BRAND + PRODUCT RATING */}

        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-[10px] font-black uppercase tracking-[0.16em] text-zinc-600">
            {product.brand}
          </p>

          <div className="flex shrink-0 items-center gap-1 text-[11px] font-black">
            <Star
              size={12}
              fill="currentColor"
              className="text-amber-400"
            />

            <span className="text-zinc-300">
              {product.rating}
            </span>

            <span className="hidden text-zinc-700 sm:inline">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* TITLE */}

        <Link
          to={`/products/${product.id}`}
          className="block"
        >
          <h3
            className="
              mt-2.5
              line-clamp-2
              min-h-[48px]
              text-[17px]
              font-black
              leading-6
              tracking-[-0.015em]
              text-white
              transition
              duration-200
              group-hover:text-emerald-200

              sm:text-lg
            "
          >
            {product.title}
          </h3>
        </Link>

        {/* DESCRIPTION */}

        <p className="mt-1.5 line-clamp-2 min-h-[40px] text-xs leading-5 text-zinc-600 sm:text-[13px]">
          {product.description?.[
            language
          ] ||
            product.description?.en ||
            ""}
        </p>

        {/* =================================================
            INTELLIGENCE STRIP
           ================================================= */}

        <div
          className="
            mt-4
            rounded-2xl
            border border-cyan-400/[0.08]
            bg-gradient-to-r
            from-cyan-400/[0.025]
            to-emerald-400/[0.025]
            p-3
          "
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cyan-400/[0.06] text-cyan-300">
                <Activity size={14} />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-[9px] font-black uppercase tracking-[0.13em] text-zinc-600">
                    {text.valueScore}
                  </p>

                  <span
                    title={text.demo}
                    className="text-zinc-700"
                  >
                    <Sparkles size={10} />
                  </span>
                </div>

                <p className="mt-0.5 text-[11px] font-black text-zinc-300">
                  {scoreLabel}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-xl font-black tracking-[-0.04em] text-cyan-200">
                {valueScore}
                <span className="text-[10px] text-zinc-700">
                  /100
                </span>
              </p>
            </div>
          </div>

          <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
              style={{
                width: `${valueScore}%`,
              }}
            />
          </div>
        </div>

        {/* =================================================
            SELLER
           ================================================= */}

        <div className="mt-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-white/[0.05] bg-black/20 text-zinc-500">
                <Store size={14} />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-700">
                  {text.seller}
                </p>

                <div className="mt-0.5 flex min-w-0 items-center gap-1.5">
                  <p className="truncate text-xs font-black text-zinc-300">
                    {bestOffer.seller}
                  </p>

                  {bestOffer.verified && (
                    <BadgeCheck
                      size={12}
                      className="shrink-0 text-emerald-400"
                    />
                  )}
                </div>
              </div>
            </div>

            {bestOffer.rating && (
              <div className="flex shrink-0 items-center gap-1 rounded-lg bg-black/25 px-2 py-1 text-[10px] font-black text-zinc-300">
                <Star
                  size={10}
                  fill="currentColor"
                  className="text-amber-400"
                />

                {bestOffer.rating}
              </div>
            )}
          </div>

          {/* STOCK + DELIVERY */}

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/[0.05] pt-2.5">
            {isAvailable ? (
              <div
                className={`flex items-center gap-1.5 text-[10px] font-black ${
                  lowStock
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    lowStock
                      ? "bg-amber-400"
                      : "bg-emerald-400"
                  }`}
                />

                {lowStock
                  ? `${text.only} ${currentStock} ${text.left}`
                  : text.inStock}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[10px] font-black text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                {text.outOfStock}
              </div>
            )}

            {deliveryLabel && (
              <div className="flex min-w-0 items-center gap-1.5 text-[10px] font-bold text-zinc-600">
                <Truck
                  size={11}
                  className="shrink-0"
                />

                <span className="truncate">
                  {deliveryLabel}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            PRICE + CART
           ================================================= */}

        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              {totalOffers > 1 && (
                <p className="mb-1 flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.12em] text-emerald-400">
                  <Zap size={10} />
                  {text.bestPrice}
                </p>
              )}

              <p className="sf-price text-[22px] font-black tracking-[-0.04em] sm:text-2xl">
                {formatPrice(
                  currentPrice
                )}
              </p>

              {currentOldPrice >
                currentPrice && (
                <div className="mt-0.5 flex items-center gap-2">
                  <p className="text-[11px] text-zinc-700 line-through">
                    {formatPrice(
                      currentOldPrice
                    )}
                  </p>

                  {discount > 0 && (
                    <span className="text-[9px] font-black text-emerald-500">
                      ↓ {discount}%
                    </span>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              disabled={!isAvailable}
              onClick={() =>
                addToCart(cartProduct)
              }
              className="
                sf-primary-button
                grid h-12 w-12
                shrink-0
                place-items-center
                rounded-2xl
                disabled:cursor-not-allowed
                disabled:border-white/[0.04]
                disabled:bg-zinc-900
                disabled:text-zinc-700
                disabled:shadow-none
                disabled:filter-none
              "
              aria-label={t(
                "product.addToCart"
              )}
            >
              <ShoppingBag size={18} />
            </button>
          </div>

          {/* FOOTER */}

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/[0.05] pt-3">
            <div className="flex min-w-0 items-center gap-1.5 text-[10px] font-bold text-zinc-600">
              <Truck
                size={11}
                className="shrink-0"
              />

              <span className="truncate">
                {Number(
                  bestOffer.shipping
                ) === 0
                  ? text.freeDelivery
                  : `${
                      text.shipping
                    }: ${formatPrice(
                      bestOffer.shipping
                    )}`}
              </span>
            </div>

            <Link
              to={`/products/${product.id}`}
              className="flex shrink-0 items-center gap-1 text-[10px] font-black text-emerald-400 transition hover:text-emerald-300"
            >
              {text.compare}{" "}
              {totalOffers}

              <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;