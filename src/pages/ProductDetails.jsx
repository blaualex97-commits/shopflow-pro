import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  Info,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  Truck,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import PriceAlert from "../components/product/PriceAlert";
import PriceIntelligence from "../components/product/PriceIntelligence";
import ProductSpecs from "../components/product/ProductSpecs";
import SellerMatrix from "../components/product/SellerMatrix";
import SmartAlternatives from "../components/product/SmartAlternatives";

import { useLanguage } from "../context/LanguageContext";
import { useShop } from "../context/ShopContext";
import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();
  const { language, t } = useLanguage();

  const { addToCart, toggleFavorite, isFavorite } = useShop();

  const ro = language === "ro";

  const product = products.find((item) => item.id === Number(id));

  const formatPrice = (price = 0) =>
    new Intl.NumberFormat(ro ? "ro-RO" : "en-US", {
      style: "currency",
      currency: "RON",
      maximumFractionDigits: 0,
    }).format(Number(price) || 0);

  if (!product) {
    return (
      <main className="grid min-h-[70vh] place-items-center px-5">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-black text-white">
            {ro ? "Produsul nu a fost găsit" : "Product not found"}
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            {ro
              ? "Produsul căutat nu există în catalogul ShopFlow."
              : "The requested product does not exist in the ShopFlow catalog."}
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-6 py-3 font-black text-black transition hover:bg-emerald-300"
          >
            <ArrowLeft size={17} />
            {ro ? "Înapoi la produse" : "Back to products"}
          </Link>
        </div>
      </main>
    );
  }

  const favorite = isFavorite(product.id);

  const offers = Array.isArray(product.offers) ? product.offers : [];

  const availableOffers = offers
    .filter((offer) => Number(offer.stock) > 0)
    .sort((a, b) => {
      const totalA =
        Number(a.price || 0) + Number(a.shipping || 0);

      const totalB =
        Number(b.price || 0) + Number(b.shipping || 0);

      return totalA - totalB;
    });

  const bestOffer = availableOffers[0] || null;

  const lowestListedOffer =
    offers.length > 0
      ? [...offers].sort(
          (a, b) => Number(a.price || 0) - Number(b.price || 0),
        )[0]
      : null;

  const hasMarketplaceOffers = offers.length > 0;

  // Pentru produsele fără listă de selleri, păstrăm oferta
  // proprie a produsului, dacă există stoc.
  const fallbackAvailable =
    !hasMarketplaceOffers && Number(product.stock) > 0;

  const currentPrice = Number(
    bestOffer?.price ?? product.price ?? 0,
  );

  const oldPrice = Number(
    bestOffer?.oldPrice ?? product.oldPrice ?? currentPrice,
  );

  const currentStock = Number(
    bestOffer?.stock ?? product.stock ?? 0,
  );

  const shipping = Number(bestOffer?.shipping || 0);

  const lowestListedPrice = Number(
    lowestListedOffer?.price ?? currentPrice,
  );

  const discount =
    oldPrice > currentPrice && oldPrice > 0
      ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
      : 0;

  const canBuy = Boolean(bestOffer || fallbackAvailable);

  const delivery =
    bestOffer?.delivery?.label?.[language] ||
    bestOffer?.delivery?.label?.en ||
    null;

  const handleAddOfferToCart = (offer) => {
    if (!offer || Number(offer.stock) <= 0) return;

    addToCart({
      ...product,
      price: Number(offer.price),
      oldPrice:
        offer.oldPrice ?? product.oldPrice ?? Number(offer.price),
      stock: Number(offer.stock),
      selectedOffer: { ...offer },
    });
  };

  const handleAddBestToCart = () => {
    if (bestOffer) {
      handleAddOfferToCart(bestOffer);
      return;
    }

    if (fallbackAvailable) {
      addToCart(product);
    }
  };

  const scrollToSellers = () => {
    document.getElementById("seller-matrix")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="mx-auto w-full max-w-[1500px] min-w-0 px-4 pb-20 pt-7 sm:px-6 sm:pt-10">
      {/* BREADCRUMB */}
      <nav
        aria-label={ro ? "Navigare produs" : "Product navigation"}
        className="flex min-w-0 flex-wrap items-center gap-2 text-xs font-bold text-zinc-500 sm:text-sm"
      >
        <Link
          to="/products"
          className="inline-flex items-center gap-2 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          {ro ? "Produse" : "Products"}
        </Link>

        <span className="text-zinc-700">/</span>

        <span className="max-w-full truncate text-zinc-300">
          {product.title}
        </span>
      </nav>

      {/* PRODUCT HERO */}
      <section className="mt-7 grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-9">
        {/* PRODUCT IMAGE */}
        <div className="min-w-0">
          <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[30px] border border-white/[0.08] bg-white sm:min-h-[470px] lg:min-h-[600px]">
            <img
              src={product.image}
              alt={product.title}
              className="h-full max-h-[650px] min-h-[340px] w-full object-contain sm:min-h-[470px] lg:min-h-[600px]"
            />

            {discount > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-[#101619] px-3 py-2 text-xs font-black text-emerald-300 shadow-lg">
                −{discount}%
              </span>
            )}

            <button
              type="button"
              onClick={() => toggleFavorite(product)}
              aria-label={
                favorite
                  ? ro
                    ? "Elimină din favorite"
                    : "Remove from favorites"
                  : ro
                    ? "Adaugă la favorite"
                    : "Add to favorites"
              }
              className={`absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-2xl border shadow-lg transition ${
                favorite
                  ? "border-emerald-400/40 bg-emerald-400 text-black"
                  : "border-black/10 bg-[#101619] text-white hover:text-emerald-300"
              }`}
            >
              <Heart
                size={19}
                fill={favorite ? "currentColor" : "none"}
              />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
              <ShieldCheck size={16} className="text-emerald-400" />
              {ro
                ? "Compară ofertele înainte de cumpărare"
                : "Compare offers before buying"}
            </div>

            <span className="rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-amber-200">
              DEMO MARKETPLACE
            </span>
          </div>
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
              {product.brand}
            </span>

            <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-zinc-400">
              {ro ? "Marketplace multi-seller" : "Multi-seller marketplace"}
            </span>
          </div>

          <h1 className="mt-4 break-words text-3xl font-black tracking-tight text-white sm:text-4xl xl:text-5xl">
            {product.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 font-black text-white">
              <Star
                size={17}
                fill="currentColor"
                className="text-amber-400"
              />
              {product.rating}
            </span>

            <span className="text-zinc-500">
              {product.reviews} {ro ? "recenzii" : "reviews"}
            </span>

            <span className="text-zinc-700">•</span>

            <span className="font-bold text-zinc-400">
              {hasMarketplaceOffers ? offers.length : 1}{" "}
              {ro ? "oferte listate" : "listed offers"}
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400">
            {product.description?.[language] ||
              product.description?.en ||
              ""}
          </p>

          {/* BEST AVAILABLE OFFER */}
          <div className="mt-7 overflow-hidden rounded-[28px] border border-emerald-400/25 bg-[radial-gradient(circle_at_top_right,rgba(32,227,162,0.09),transparent_55%),#101619] p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400">
                <CheckCircle2 size={15} />
                {ro
                  ? "CEA MAI BUNĂ OFERTĂ DISPONIBILĂ"
                  : "BEST AVAILABLE OFFER"}
              </p>

              {bestOffer && (
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-emerald-300">
                  {ro ? "Preț total comparat" : "Total price compared"}
                </span>
              )}
            </div>

            {canBuy ? (
              <>
                <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
                  <span className="break-words text-4xl font-black tracking-tight text-white sm:text-5xl">
                    {formatPrice(currentPrice)}
                  </span>

                  {oldPrice > currentPrice && (
                    <span className="pb-1 text-lg font-bold text-zinc-600 line-through">
                      {formatPrice(oldPrice)}
                    </span>
                  )}
                </div>

                {bestOffer && (
                  <p className="mt-2 text-xs text-zinc-500">
                    {shipping === 0
                      ? ro
                        ? "Transport gratuit"
                        : "Free shipping"
                      : `${ro ? "Transport" : "Shipping"}: ${formatPrice(
                          shipping,
                        )}`}
                    {" · "}
                    <span className="font-black text-emerald-300">
                      {ro ? "Total" : "Total"}:{" "}
                      {formatPrice(currentPrice + shipping)}
                    </span>
                  </p>
                )}

                {lowestListedOffer &&
                  lowestListedPrice < currentPrice && (
                    <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-400/10 bg-amber-400/[0.04] p-3 text-xs leading-5 text-zinc-400">
                      <Info
                        size={15}
                        className="mt-0.5 shrink-0 text-amber-300"
                      />

                      <span>
                        {ro
                          ? "Cel mai mic preț listat:"
                          : "Lowest listed product price:"}{" "}
                        <strong className="text-white">
                          {formatPrice(lowestListedPrice)}
                        </strong>
                        {" · "}
                        {Number(lowestListedOffer.stock) <= 0
                          ? ro
                            ? "Oferta respectivă nu are stoc."
                            : "That offer is out of stock."
                          : ro
                            ? "Transportul poate modifica prețul total."
                            : "Shipping may change the total price."}
                      </span>
                    </div>
                  )}

                <div className="mt-6 grid gap-3 border-t border-white/[0.07] pt-5 sm:grid-cols-2">
                  <div className="flex min-w-0 items-start gap-2">
                    <Store
                      size={17}
                      className="mt-0.5 shrink-0 text-zinc-500"
                    />

                    <div className="min-w-0">
                      <p className="text-xs text-zinc-500">
                        {ro ? "Vândut de" : "Sold by"}
                      </p>

                      <p className="mt-1 break-words text-sm font-black text-white">
                        {bestOffer?.seller ||
                          (ro ? "Catalog ShopFlow" : "ShopFlow catalog")}
                      </p>

                      {bestOffer?.verified && (
                        <p className="mt-1 flex items-center gap-1 text-xs font-bold text-emerald-300">
                          <ShieldCheck size={13} />
                          {ro
                            ? "Seller verificat (demo)"
                            : "Verified seller (demo)"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex min-w-0 items-start gap-2">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />

                    <div>
                      <p className="text-xs text-zinc-500">
                        {ro ? "Disponibilitate" : "Availability"}
                      </p>

                      <p className="mt-1 text-sm font-black text-emerald-300">
                        {ro ? "În stoc" : "In stock"} · {currentStock}{" "}
                        {ro ? "buc." : "units"}
                      </p>

                      {delivery && (
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-400">
                          <Truck size={13} />
                          {delivery}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
                  <button
                    type="button"
                    onClick={handleAddBestToCart}
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-black transition hover:bg-emerald-300"
                  >
                    <ShoppingBag size={19} />
                    {t("product.addToCart")}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(product)}
                    className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border px-5 py-4 text-sm font-black transition ${
                      favorite
                        ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                        : "border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={favorite ? "currentColor" : "none"}
                    />
                    {t("nav.favorites")}
                  </button>
                </div>

                {hasMarketplaceOffers && (
                  <button
                    type="button"
                    onClick={scrollToSellers}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-black text-emerald-300 transition hover:text-emerald-200"
                  >
                    {ro ? "Compară toate ofertele" : "Compare all offers"}
                    <ArrowRight size={16} />
                  </button>
                )}
              </>
            ) : (
              <div className="mt-5">
                <div className="flex items-center gap-2 font-black text-red-300">
                  <XCircle size={20} />
                  {ro ? "Stoc epuizat" : "Out of stock"}
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  {ro
                    ? "Momentan nu există o ofertă disponibilă pentru acest produs."
                    : "There is currently no available offer for this product."}
                </p>

                <button
                  type="button"
                  onClick={() => toggleFavorite(product)}
                  className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-black text-white transition hover:bg-white/[0.08]"
                >
                  <Heart
                    size={18}
                    fill={favorite ? "currentColor" : "none"}
                  />
                  {t("nav.favorites")}
                </button>
              </div>
            )}
          </div>

          <p className="mt-4 text-xs leading-5 text-zinc-600">
            {ro
              ? "Prețurile, stocurile și informațiile sellerilor sunt demonstrative, nu date live."
              : "Prices, stock and seller information are demo data, not live information."}
          </p>
        </div>
      </section>

      {/* PRICE INTELLIGENCE */}
      {canBuy && (
        <PriceIntelligence
          product={product}
          bestOffer={bestOffer}
          availableOffers={availableOffers}
          language={language}
        />
      )}

      {/* PRICE ALERT */}
      <section className="mt-6">
        <PriceAlert
          product={product}
          currentPrice={canBuy ? currentPrice : null}
          language={language}
        />
      </section>

      {/* SELLER MATRIX */}
      {hasMarketplaceOffers && (
        <SellerMatrix
          offers={offers}
          bestOffer={bestOffer}
          onAddToCart={handleAddOfferToCart}
          language={language}
        />
      )}

      {/* SPECIFICATIONS */}
      <ProductSpecs specs={product.specs} language={language} />

      {/* MARKETPLACE INFORMATION */}
      <section className="mt-16 grid gap-4 md:grid-cols-3">
        <InfoCard
          icon={ShieldCheck}
          title={ro ? "Selleri verificați" : "Verified sellers"}
          description={
            ro
              ? "Poți vedea care selleri sunt marcați ca verificați în catalogul demonstrativ."
              : "See which sellers are marked as verified in the demo catalog."
          }
        />

        <InfoCard
          icon={Truck}
          title={ro ? "Livrare transparentă" : "Transparent delivery"}
          description={
            ro
              ? "Compară costul transportului și termenul de livrare afișat pentru fiecare ofertă."
              : "Compare shipping costs and displayed delivery estimates for each offer."
          }
        />

        <InfoCard
          icon={PackageCheck}
          title={
            ro
              ? "Cea mai bună ofertă disponibilă"
              : "Best available offer"
          }
          description={
            ro
              ? "Ofertele fără stoc nu sunt selectate automat. Comparația ține cont de prețul produsului și de transport."
              : "Out-of-stock offers are not automatically selected. The comparison considers product price and shipping."
          }
        />
      </section>

      {/* SIMILAR PRODUCTS */}
      <SmartAlternatives product={product} language={language} />
    </main>
  );
}

function InfoCard({ icon: Icon, title, description }) {
  return (
    <article className="rounded-[26px] border border-white/[0.08] bg-[#101619] p-6">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400/[0.08] text-emerald-400">
        <Icon size={21} />
      </div>

      <h3 className="mt-5 text-lg font-black text-white">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-zinc-500">
        {description}
      </p>
    </article>
  );
}

export default ProductDetails;