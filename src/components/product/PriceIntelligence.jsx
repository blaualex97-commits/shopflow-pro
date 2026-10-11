import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Info,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { getPriceHistory } from "../../data/priceHistory";
import PriceHistoryChart from "./PriceHistoryChart";

function PriceIntelligence({
  product,
  bestOffer,
  availableOffers = [],
  language = "en",
}) {
  const ro = language === "ro";

  const currentPrice = Number(bestOffer?.price ?? product.price ?? 0);
  const oldPrice = Number(
    bestOffer?.oldPrice ?? product.oldPrice ?? currentPrice,
  );

  const history = getPriceHistory(product.id, currentPrice);
  const startingPrice = history[0];
  const historicalLow = Math.min(...history);
  const historicalHigh = Math.max(...history);

  const discount =
    oldPrice > currentPrice && oldPrice > 0
      ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
      : 0;

  // Scor demonstrativ, calculat din datele locale ale produsului.
  const score = Math.min(
    98,
    70 +
      (discount >= 20 ? 12 : discount >= 10 ? 8 : discount > 0 ? 4 : 0) +
      (Number(product.rating) >= 4.8
        ? 7
        : Number(product.rating) >= 4.5
          ? 4
          : 0) +
      (bestOffer?.verified ? 5 : 0) +
      (bestOffer && Number(bestOffer.shipping) === 0 ? 4 : 0) +
      (availableOffers.length >= 2 ? 3 : 0),
  );

  const scoreLabel =
    score >= 90
      ? ro
        ? "Valoare excelentă"
        : "Excellent value"
      : score >= 82
        ? ro
          ? "Valoare foarte bună"
          : "Great value"
        : ro
          ? "Valoare bună"
          : "Good value";

  const belowStartingPrice =
    startingPrice > 0
      ? Math.max(
          0,
          Math.round(((startingPrice - currentPrice) / startingPrice) * 100),
        )
      : 0;

  const atSimulatedLow = currentPrice <= historicalLow;

  const formatPrice = (price) =>
    new Intl.NumberFormat(ro ? "ro-RO" : "en-US", {
      style: "currency",
      currency: "RON",
      maximumFractionDigits: 0,
    }).format(price);

  const signal = !bestOffer
    ? {
        title: ro ? "Momentan indisponibil" : "Currently unavailable",
        detail: ro
          ? "Nu există o ofertă cu stoc disponibil."
          : "There are no offers currently in stock.",
      icon: Clock3,
    }
    : atSimulatedLow
      ? {
          title: ro ? "Preț minim în simulare" : "Simulated price low",
          detail: ro
            ? "Prețul actual este la minimul din istoricul demonstrativ."
            : "The current price matches the low in the demo history.",
          icon: CheckCircle2,
        }
      : {
          title: ro ? "Compară înainte să cumperi" : "Compare before buying",
          detail: ro
            ? "Verifică prețul total, transportul și disponibilitatea fiecărui seller."
            : "Check each seller’s total price, shipping and availability.",
          icon: Activity,
        };

  const SignalIcon = signal.icon;

  return (
    <section id="price-intelligence" className="mt-16 scroll-mt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
            <Sparkles size={15} />
            SHOPFLOW NEURAL COMMERCE
          </div>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
            Price Intelligence
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
            {ro
              ? "O privire asupra valorii produsului, evoluției simulate a prețului și ofertelor disponibile."
              : "A closer look at product value, simulated price trends and available offers."}
          </p>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-3 py-2 text-xs font-bold text-amber-200">
          <Info size={14} />
          {ro ? "Date demonstrative · Nu sunt live" : "Demo data · Not live"}
        </span>
      </div>

      <div className="mt-8 grid min-w-0 gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="grid min-w-0 gap-4">
          <article className="overflow-hidden rounded-[28px] border border-emerald-400/20 bg-[radial-gradient(circle_at_top_right,rgba(32,227,162,0.12),transparent_55%),#101619] p-6 sm:p-7">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
              VALUE SCORE
            </p>

            <div className="mt-5 flex flex-wrap items-end gap-3">
              <span className="text-6xl font-black tracking-[-0.07em] text-white sm:text-7xl">
                {score}
              </span>

              <span className="pb-2 text-xl font-bold text-zinc-500">/100</span>
            </div>

            <div
              className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.08]"
              role="progressbar"
              aria-label="Value Score"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={score}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300"
                style={{ width: `${score}%` }}
              />
            </div>

            <div className="mt-5 flex items-center gap-2 text-emerald-300">
              <CheckCircle2 size={18} />
              <span className="font-black">{scoreLabel}</span>
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              {ro
                ? "Scor estimativ bazat pe reducere, rating, verificarea sellerului, transport și numărul ofertelor disponibile."
                : "An estimated score based on discount, rating, seller verification, shipping and the number of available offers."}
            </p>
          </article>

          <article className="rounded-[28px] border border-white/[0.08] bg-[#101619] p-6 sm:p-7">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              BUY SIGNAL
            </p>

            <div className="mt-4 flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                <SignalIcon size={21} />
              </div>

              <div>
                <h3 className="text-lg font-black text-white">
                  {signal.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {signal.detail}
                </p>
              </div>
            </div>

            <p className="mt-5 border-t border-white/[0.07] pt-4 text-xs leading-5 text-zinc-600">
              {ro
                ? "Semnal demonstrativ, nu o recomandare de cumpărare sau o predicție a prețului viitor."
                : "Demo signal, not a purchase recommendation or a prediction of future prices."}
            </p>
          </article>
        </div>

        <PriceHistoryChart
          productId={product.id}
          currentPrice={currentPrice}
          language={language}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InsightCard
          icon={belowStartingPrice > 0 ? ArrowDownRight : ArrowUpRight}
          label={ro ? "Față de începutul simulării" : "Vs. demo starting price"}
          value={`${belowStartingPrice}%`}
          detail={
            ro
              ? "Diferență calculată din date demo"
              : "Difference calculated from demo data"
          }
        />

        <InsightCard
          icon={Activity}
          label={ro ? "Interval de preț simulat" : "Simulated price range"}
          value={formatPrice(historicalLow)}
          detail={`${ro ? "Maxim" : "High"}: ${formatPrice(historicalHigh)}`}
        />

        <InsightCard
          icon={ShieldCheck}
          label={ro ? "Selleri verificați" : "Verified sellers"}
          value={String(
            availableOffers.filter((offer) => offer.verified).length,
          )}
          detail={`${availableOffers.length} ${
            ro ? "oferte disponibile" : "available offers"
          }`}
        />

        <InsightCard
          icon={Truck}
          label={ro ? "Transport ofertă selectată" : "Selected offer shipping"}
          value={
            !bestOffer
              ? "—"
              : Number(bestOffer.shipping) === 0
                ? ro
                  ? "Gratuit"
                  : "Free"
                : formatPrice(Number(bestOffer.shipping))
          }
          detail={
            bestOffer?.seller ||
            (ro ? "Nicio ofertă disponibilă" : "No available offer")
          }
        />
      </div>
    </section>
  );
}

function InsightCard({ icon: Icon, label, value, detail }) {
  return (
    <article className="min-w-0 rounded-[24px] border border-white/[0.08] bg-[#101619] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold text-zinc-500">{label}</p>
        <Icon size={18} className="shrink-0 text-emerald-400" />
      </div>

      <p className="mt-4 break-words text-2xl font-black tracking-tight text-white">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-zinc-600">{detail}</p>
    </article>
  );
}

export default PriceIntelligence;