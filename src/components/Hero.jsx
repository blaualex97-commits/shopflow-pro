
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  ChartNoAxesCombined,
  ChevronDown,
  PackageSearch,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingDown,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Hero() {
  const { language } = useLanguage();

  const text = {
    badge: "SHOPFLOW NEURAL COMMERCE",

    title1:
      language === "ro"
        ? "Cumpără mai inteligent."
        : "Shop smarter.",

    title2:
      language === "ro"
        ? "Vezi piața înainte să cumperi."
        : "See the market before you buy.",

    description:
      language === "ro"
        ? "Compară selleri, urmărește scăderile de preț și găsește oferta cu cea mai bună valoare — într-un marketplace construit în jurul deciziilor inteligente."
        : "Compare sellers, track price drops and find the best-value offer in a marketplace built around smarter buying decisions.",

    explore:
      language === "ro"
        ? "Explorează marketplace-ul"
        : "Explore marketplace",

    drops:
      language === "ro"
        ? "Vezi price drops"
        : "View price drops",

    marketPulse: "Market Pulse",

    monitored:
      language === "ro"
        ? "Produse monitorizate"
        : "Products monitored",

    priceDrops:
      language === "ro"
        ? "Scăderi de preț"
        : "Price drops",

    verified:
      language === "ro"
        ? "Selleri verificați"
        : "Verified sellers",

    intelligence: "Price Intelligence",

    bestAvailable:
      language === "ro"
        ? "Cel mai bun preț disponibil"
        : "Best available price",

    valueScore: "Value Score",

    trend:
      language === "ro"
        ? "Trend preț"
        : "Price trend",

    sellerTrust: "Seller trust",
    buySignal: "Buy signal",

    goodTime:
      language === "ro"
        ? "Moment bun de cumpărat"
        : "Good time to buy",

    verifiedSeller:
      language === "ro"
        ? "Seller verificat"
        : "Verified seller",

    powered:
      language === "ro"
        ? "Analiză ShopFlow"
        : "Powered by ShopFlow",

    demo:
      language === "ro"
        ? "Date demonstrative"
        : "Demo intelligence",

    compare:
      language === "ro"
        ? "Compară oferta"
        : "Compare offer",
  };

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      {/* AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute -left-52 -top-24 h-[620px] w-[620px] rounded-full bg-emerald-400/[0.09] blur-[160px]" />

      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-cyan-400/[0.055] blur-[170px]" />

      <div
        className="
          relative mx-auto grid
          w-full min-w-0 max-w-[1500px]
          gap-10 px-4 py-12
          md:px-6 md:py-14
          lg:grid-cols-[0.92fr_1.08fr]
          lg:items-center lg:gap-12 lg:py-16
          xl:gap-16
        "
      >
        {/* LEFT */}
        <div className="relative z-10 min-w-0">
          <div
            className="
              inline-flex w-fit max-w-full
              items-center gap-2
              rounded-full
              border border-emerald-400/20
              bg-emerald-400/[0.055]
              px-3.5 py-2
              text-[10px] font-black uppercase
              tracking-[0.18em] text-emerald-300
              sm:text-[11px]
            "
          >
            <BrainCircuit size={14} className="shrink-0" />
            <span className="min-w-0">{text.badge}</span>
          </div>

          <h1
            className="
              mt-6 max-w-[780px]
              text-[clamp(2rem,9vw,5.8rem)]
              font-black leading-[0.94]
              tracking-[-0.06em]
            "
          >
            <span className="block text-[#f5f7f8]">
              {text.title1}
            </span>

            <span
              className="
                mt-2 block
                bg-gradient-to-r
                from-emerald-300
                via-emerald-400
                to-cyan-300
                bg-clip-text text-transparent
              "
            >
              {text.title2}
            </span>
          </h1>

          <p
            className="
              mt-6 max-w-xl
              text-sm leading-7 text-zinc-400
              sm:text-base sm:leading-8
            "
          >
            {text.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="
                sf-primary-button
                inline-flex items-center gap-2
                rounded-2xl px-5 py-3.5
                text-sm font-black
                sm:px-6 sm:text-base
              "
            >
              {text.explore}
              <ArrowRight size={17} className="shrink-0" />
            </Link>

            <Link
              to="/products?sort=discount"
              className="
                sf-secondary-button
                inline-flex items-center gap-2
                rounded-2xl px-5 py-3.5
                text-sm font-black
                sm:px-6 sm:text-base
              "
            >
              <TrendingDown size={17} className="shrink-0" />
              {text.drops}
            </Link>
          </div>

          {/* MARKET PULSE */}
          <div className="mt-8 max-w-[690px]">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-emerald-400" />

                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
                  {text.marketPulse}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {text.demo}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <MetricCard
                icon={PackageSearch}
                value="12"
                label={text.monitored}
              />

              <MetricCard
                icon={TrendingDown}
                value="4"
                label={text.priceDrops}
                accent
              />

              <MetricCard
                icon={BadgeCheck}
                value="8"
                label={text.verified}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — INTELLIGENCE PANEL */}
        <div className="relative min-w-0">
          <div
            className="
              relative overflow-hidden
              rounded-[30px]
              border border-white/[0.08]
              bg-[#0e1316] p-3
              shadow-[0_30px_90px_rgba(0,0,0,0.36)]
              sm:p-4 lg:rounded-[34px]
            "
          >
            {/* TOP GLOW */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/[0.06] blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-emerald-400/[0.055] blur-[95px]" />

            {/* TOP BAR */}
            <div className="relative flex flex-wrap items-center justify-between gap-3 px-2 pb-4 pt-1">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-cyan-300" />

                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200/80">
                    {text.intelligence}
                  </p>
                </div>

                <p className="mt-1 text-xs text-zinc-600">
                  {text.powered}
                </p>
              </div>

              <div className="sf-badge sf-badge-ai">
                <BrainCircuit size={13} />
                SHOPFLOW AI
              </div>
            </div>

            {/* PRODUCT HERO */}
            <div
              className="
                relative overflow-hidden
                rounded-[24px]
                border border-white/[0.06]
                bg-[#12181c]
              "
            >
              <div className="grid gap-0 sm:grid-cols-[0.92fr_1.08fr]">
                {/* IMAGE */}
                <div className="relative min-h-[240px] overflow-hidden sm:min-h-[360px]">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1100&q=90"
                    alt="Pulse ANC Headphones"
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

                  <div className="absolute bottom-4 left-4">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[10px] font-black text-white backdrop-blur-xl">
                      <ShieldCheck
                        size={12}
                        className="text-emerald-400"
                      />
                      {text.verifiedSeller}
                    </div>
                  </div>
                </div>

                {/* DATA */}
                <div className="relative flex min-w-0 flex-col p-5 sm:p-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-600">
                      Pulse
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                      Pulse ANC
                      <span className="block text-zinc-500">
                        Headphones
                      </span>
                    </h2>
                  </div>

                  <div className="mt-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-600">
                      {text.bestAvailable}
                    </p>

                    <div className="mt-1 flex flex-wrap items-end gap-3">
                      <p className="sf-price-ai text-4xl font-black tracking-[-0.05em]">
                        899 RON
                      </p>

                      <span className="mb-1 inline-flex items-center gap-1 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2.5 py-1 text-[10px] font-black text-emerald-300">
                        <ArrowDownRight size={12} />
                        8%
                      </span>
                    </div>
                  </div>

                  {/* VALUE SCORE */}
                  <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.025] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-200/65">
                          {text.valueScore}
                        </p>

                        <p className="mt-1 text-2xl font-black">
                          92
                          <span className="text-sm text-zinc-600">
                            /100
                          </span>
                        </p>
                      </div>

                      <ChartNoAxesCombined
                        size={24}
                        className="text-cyan-300"
                      />
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                      <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" />
                    </div>
                  </div>

                  {/* SIGNALS */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Signal
                      label={text.trend}
                      value="↓ 8%"
                      good
                    />

                    <Signal
                      label={text.sellerTrust}
                      value="4.9 / 5"
                    />
                  </div>

                  <div className="mt-2 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.16em] text-zinc-600">
                      {text.buySignal}
                    </p>

                    <div className="mt-1 flex items-center justify-between gap-3">
                      <p className="text-sm font-black text-emerald-300">
                        {text.goodTime}
                      </p>

                      <Sparkles
                        size={15}
                        className="text-emerald-400"
                      />
                    </div>
                  </div>

                  <Link
                    to="/products/2"
                    className="mt-4 inline-flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm font-black text-zinc-300 transition hover:border-emerald-400/20 hover:bg-emerald-400/[0.04] hover:text-white"
                  >
                    {text.compare}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* BOTTOM SELLER STRIP */}
            <div className="relative mt-3 grid gap-2 sm:grid-cols-3">
              <SellerChip name="TechNova" value="899 RON" best />

              <SellerChip name="DigitalHub" value="929 RON" />

              <SellerChip
                name="ElectroPoint"
                value="879 RON"
                unavailable
              />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE HINT */}
      <div className="relative mx-auto hidden max-w-[1500px] justify-center px-4 pb-5 md:flex">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-700">
          <ChevronDown size={13} />
          ShopFlow Market
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  icon: Icon,
  value,
  label,
  accent = false,
}) {
  return (
    <div
      className={`
        rounded-2xl border p-4 transition
        ${
          accent
            ? "border-emerald-400/10 bg-emerald-400/[0.035]"
            : "border-white/[0.06] bg-white/[0.025]"
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <strong
            className={`text-xl font-black ${
              accent ? "text-emerald-300" : "text-white"
            }`}
          >
            {value}
          </strong>

          <p className="mt-1 text-[10px] font-bold leading-4 text-zinc-600">
            {label}
          </p>
        </div>

        <Icon
          size={16}
          className={
            accent ? "text-emerald-400" : "text-zinc-600"
          }
        />
      </div>
    </div>
  );
}

function Signal({
  label,
  value,
  good = false,
}) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-black/20 p-3">
      <p className="text-[9px] font-black uppercase tracking-[0.13em] text-zinc-600">
        {label}
      </p>

      <p
        className={`mt-1 text-xs font-black ${
          good ? "text-emerald-300" : "text-zinc-300"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function SellerChip({
  name,
  value,
  best = false,
  unavailable = false,
}) {
  return (
    <div
      className={`rounded-2xl border p-3.5 ${
        best
          ? "border-emerald-400/15 bg-emerald-400/[0.035]"
          : "border-white/[0.06] bg-black/20"
      } ${unavailable ? "opacity-45" : ""}`}
    >
      <div className="flex items-center gap-2">
        <Store
          size={13}
          className={
            best ? "text-emerald-400" : "text-zinc-600"
          }
        />

        <p className="truncate text-[11px] font-black text-zinc-400">
          {name}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <strong
          className={`text-sm ${
            best ? "text-emerald-300" : "text-zinc-300"
          }`}
        >
          {value}
        </strong>

        {best && (
          <span className="text-[8px] font-black uppercase tracking-wider text-emerald-400">
            Best
          </span>
        )}

        {unavailable && (
          <span className="text-[8px] font-black uppercase tracking-wider text-zinc-700">
            Out
          </span>
        )}
      </div>
    </div>
  );
}

export default Hero;