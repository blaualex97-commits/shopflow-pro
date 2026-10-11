import { useId } from "react";
import { TrendingDown } from "lucide-react";
import { getPriceHistory } from "../../data/priceHistory";

function PriceHistoryChart({
  productId,
  currentPrice,
  language = "en",
}) {
  const gradientId = useId().replace(/:/g, "");

  const prices = getPriceHistory(productId, currentPrice);

  const formatPrice = (price) =>
    new Intl.NumberFormat(
      language === "ro" ? "ro-RO" : "en-US",
      {
        style: "currency",
        currency: "RON",
        maximumFractionDigits: 0,
      },
    ).format(price);

  const width = 600;
  const height = 210;
  const paddingX = 12;
  const paddingY = 24;

  const minimum = Math.min(...prices);
  const maximum = Math.max(...prices);
  const range = Math.max(maximum - minimum, 1);

  const points = prices.map((price, index) => {
    const x =
      paddingX +
      (index / (prices.length - 1)) *
        (width - paddingX * 2);

    const y =
      height -
      paddingY -
      ((price - minimum) / range) *
        (height - paddingY * 2);

    return { x, y, price };
  });

  const linePath = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`,
    )
    .join(" ");

  const areaPath = `${linePath} L ${
    points[points.length - 1].x
  } ${height} L ${points[0].x} ${height} Z`;

  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];

  const change =
    firstPrice > 0
      ? ((lastPrice - firstPrice) / firstPrice) * 100
      : 0;

  const isLower = change < 0;

  const labels =
    language === "ro"
      ? ["Acum 7 săpt.", "Acum 4 săpt.", "Acum"]
      : ["7 weeks ago", "4 weeks ago", "Now"];

  return (
    <section className="min-w-0 overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#101619] p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
            SHOPFLOW INTELLIGENCE
          </p>

          <h3 className="mt-2 text-xl font-black tracking-tight text-white sm:text-2xl">
            {language === "ro"
              ? "Evoluția prețului"
              : "Price history"}
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            {language === "ro"
              ? "Simulare pentru ultimele 8 săptămâni"
              : "Simulated trend over the last 8 weeks"}
          </p>
        </div>

        <div
          className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black ${
            isLower
              ? "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300"
              : "border-white/10 bg-white/[0.04] text-zinc-300"
          }`}
        >
          <TrendingDown
            size={15}
            className={isLower ? "" : "rotate-180"}
          />

          {change > 0 ? "+" : ""}
          {change.toFixed(1)}%
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs text-zinc-500">
            {language === "ro"
              ? "Preț disponibil acum"
              : "Current available price"}
          </p>

          <p className="mt-1 text-3xl font-black tracking-tight text-white">
            {formatPrice(lastPrice)}
          </p>
        </div>

        <p className="text-xs text-zinc-500">
          {language === "ro"
            ? "Preț inițial simulat:"
            : "Simulated starting price:"}{" "}
          <span className="font-bold text-zinc-300">
            {formatPrice(firstPrice)}
          </span>
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0b1114] px-2 py-4 sm:px-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="block h-auto w-full"
          role="img"
          aria-label={
            language === "ro"
              ? "Grafic demonstrativ al evoluției prețului"
              : "Demonstration chart of the price trend"
          }
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#20e3a2"
                stopOpacity="0.22"
              />

              <stop
                offset="100%"
                stopColor="#20e3a2"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map((fraction) => (
            <line
              key={fraction}
              x1="0"
              x2={width}
              y1={height * fraction}
              y2={height * fraction}
              stroke="white"
              strokeOpacity="0.07"
              strokeDasharray="5 7"
            />
          ))}

          <path
            d={areaPath}
            fill={`url(#${gradientId})`}
          />

          <path
            d={linePath}
            fill="none"
            stroke="#20e3a2"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={index === points.length - 1 ? 6 : 3}
              fill="#20e3a2"
              stroke="#0b1114"
              strokeWidth="2"
            />
          ))}
        </svg>

        <div className="mt-2 flex justify-between gap-2 text-[10px] font-bold text-zinc-600 sm:text-xs">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-zinc-600">
        {language === "ro"
          ? "Date demonstrative generate local. Graficul nu reprezintă istoricul real al prețurilor."
          : "Locally generated demo data. This chart does not represent actual historical prices."}
      </p>
    </section>
  );
}

export default PriceHistoryChart;