import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  Truck,
  XCircle,
} from "lucide-react";

function SellerMatrix({
  offers = [],
  bestOffer,
  onAddToCart,
  language = "en",
}) {
  const ro = language === "ro";

  const formatPrice = (price = 0) =>
    new Intl.NumberFormat(ro ? "ro-RO" : "en-US", {
      style: "currency",
      currency: "RON",
      maximumFractionDigits: 0,
    }).format(Number(price) || 0);

  const sortedOffers = [...offers].sort((a, b) => {
    const aAvailable = Number(a.stock) > 0;
    const bAvailable = Number(b.stock) > 0;

    if (aAvailable !== bAvailable) {
      return aAvailable ? -1 : 1;
    }

    const aTotal = Number(a.price || 0) + Number(a.shipping || 0);
    const bTotal = Number(b.price || 0) + Number(b.shipping || 0);

    return aTotal - bTotal;
  });

  return (
    <section id="seller-matrix" className="mt-16 scroll-mt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
            SHOPFLOW MARKETPLACE
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
            {ro ? "Compară ofertele" : "Seller Matrix"}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
            {ro
              ? "Compară prețul total, disponibilitatea, livrarea și informațiile fiecărui seller."
              : "Compare total prices, availability, delivery and seller information."}
          </p>
        </div>

        <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-zinc-400">
          {offers.length} {ro ? "oferte listate" : "listed offers"}
        </div>
      </div>

      {sortedOffers.length === 0 ? (
        <div className="mt-8 rounded-[26px] border border-white/[0.08] bg-[#101619] p-6 text-sm text-zinc-400">
          {ro
            ? "Momentan nu există oferte de comparat."
            : "There are currently no offers to compare."}
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {sortedOffers.map((offer, index) => {
            const available = Number(offer.stock) > 0;
            const lowStock = available && Number(offer.stock) <= 5;
            const shipping = Number(offer.shipping || 0);
            const total = Number(offer.price || 0) + shipping;
            const isBest = available && bestOffer?.id === offer.id;

            const delivery =
              offer.delivery?.label?.[language] ||
              offer.delivery?.label?.en ||
              null;

            return (
              <article
                key={offer.id ?? `${offer.seller}-${index}`}
                className={`relative overflow-hidden rounded-[28px] border p-5 transition sm:p-6 ${
                  isBest
                    ? "border-emerald-400/30 bg-[radial-gradient(circle_at_top_right,rgba(32,227,162,0.07),transparent_60%),#101619]"
                    : "border-white/[0.08] bg-[#101619]"
                } ${available ? "hover:border-white/20" : "opacity-75"}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {isBest && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-black">
                        <CheckCircle2 size={12} />
                        {ro
                          ? "Cel mai bun preț total disponibil"
                          : "Best available total price"}
                      </span>
                    )}

                    {!available && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-400/20 bg-red-400/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-red-300">
                        <XCircle size={12} />
                        {ro ? "Stoc epuizat" : "Out of stock"}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-600">
                    OFFER {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-5 grid min-w-0 gap-6 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-center">
                  {/* SELLER */}
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/[0.07] bg-white/[0.04] text-zinc-400">
                      <Store size={20} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="break-words text-lg font-black text-white">
                        {offer.seller}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                        {offer.verified && (
                          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-300">
                            <ShieldCheck size={14} />
                            {ro ? "Verificat (demo)" : "Verified (demo)"}
                          </span>
                        )}

                        {offer.rating != null && (
                          <span className="inline-flex items-center gap-1.5 text-zinc-400">
                            <Star
                              size={13}
                              fill="currentColor"
                              className="text-amber-400"
                            />
                            <strong className="text-white">
                              {offer.rating}
                            </strong>
                            {offer.reviews != null && (
                              <span>
                                ({Number(offer.reviews).toLocaleString(
                                  ro ? "ro-RO" : "en-US",
                                )})
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* AVAILABILITY & DELIVERY */}
                  <div className="min-w-0 space-y-2">
                    <p
                      className={`flex items-center gap-2 text-sm font-black ${
                        !available
                          ? "text-red-300"
                          : lowStock
                            ? "text-amber-300"
                            : "text-emerald-300"
                      }`}
                    >
                      {available ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <XCircle size={16} />
                      )}

                      {!available
                        ? ro
                          ? "Indisponibil"
                          : "Unavailable"
                        : lowStock
                          ? ro
                            ? `Doar ${offer.stock} rămase`
                            : `Only ${offer.stock} left`
                          : ro
                            ? `În stoc · ${offer.stock} buc.`
                            : `In stock · ${offer.stock} units`}
                    </p>

                    {delivery && (
                      <p className="flex items-start gap-2 text-xs leading-5 text-zinc-500">
                        <Truck size={15} className="mt-0.5 shrink-0" />
                        <span>{delivery}</span>
                      </p>
                    )}
                  </div>

                  {/* PRICE */}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-zinc-500">
                      {ro ? "Preț produs" : "Product price"}
                    </p>

                    <p className="mt-1 text-2xl font-black tracking-tight text-white">
                      {formatPrice(offer.price)}
                    </p>

                    {Number(offer.oldPrice) > Number(offer.price) && (
                      <p className="mt-1 text-xs text-zinc-600 line-through">
                        {formatPrice(offer.oldPrice)}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-zinc-500">
                      {shipping === 0
                        ? ro
                          ? "Transport gratuit"
                          : "Free shipping"
                        : `${ro ? "Transport" : "Shipping"}: ${formatPrice(
                            shipping,
                          )}`}
                    </p>

                    <div className="mt-3 border-t border-white/[0.07] pt-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-500">
                        {ro ? "Total cu transport" : "Total with shipping"}
                      </p>

                      <p className="mt-1 text-lg font-black text-emerald-300">
                        {formatPrice(total)}
                      </p>
                    </div>
                  </div>

                  {/* ACTION */}
                  <div className="lg:min-w-[160px]">
                    <button
                      type="button"
                      disabled={!available}
                      onClick={() => onAddToCart?.(offer)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-4 text-sm font-black text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-600"
                    >
                      {available ? (
                        <>
                          <ShoppingBag size={17} />
                          {ro ? "Adaugă în coș" : "Add to cart"}
                        </>
                      ) : (
                        <>
                          <XCircle size={17} />
                          {ro ? "Indisponibil" : "Unavailable"}
                        </>
                      )}
                    </button>

                    {available && (
                      <p className="mt-2 flex items-center justify-center gap-1 text-center text-[10px] text-zinc-600">
                        <ArrowUpRight size={12} />
                        {ro
                          ? "Ofertă din catalogul demo"
                          : "Demo catalog offer"}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <p className="mt-5 text-xs leading-5 text-zinc-600">
        {ro
          ? "Prețurile, stocurile, ratingurile și datele sellerilor sunt demonstrative, nu informații live. Cea mai bună ofertă disponibilă este selectată după prețul produsului plus transport."
          : "Prices, stock, ratings and seller information are demo data, not live information. The best available offer is selected by product price plus shipping."}
      </p>
    </section>
  );
}

export default SellerMatrix;