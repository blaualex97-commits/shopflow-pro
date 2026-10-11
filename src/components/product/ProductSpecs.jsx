import { ClipboardList } from "lucide-react";

function ProductSpecs({ specs, language = "en" }) {
  const ro = language === "ro";
  const entries = Object.entries(specs || {});

  if (entries.length === 0) return null;

  const formatKey = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/[_-]/g, " ")
      .replace(/^./, (letter) => letter.toUpperCase())
      .trim();

  return (
    <section id="specifications" className="mt-16 scroll-mt-28">
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
        <ClipboardList size={16} />
        {ro ? "DATE PRODUS" : "PRODUCT DATA"}
      </div>

      <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
        {ro ? "Specificații" : "Specifications"}
      </h2>

      <p className="mt-3 text-sm leading-6 text-zinc-500">
        {ro
          ? "Caracteristicile produsului din catalogul ShopFlow."
          : "Product details from the ShopFlow catalog."}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(([key, value]) => (
          <div
            key={key}
            className="min-w-0 rounded-[24px] border border-white/[0.08] bg-[#101619] p-5"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
              {formatKey(key)}
            </p>

            <p className="mt-3 break-words text-base font-black text-zinc-100">
              {typeof value === "object" && value !== null
                ? value[language] ?? value.en ?? "—"
                : String(value)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductSpecs;