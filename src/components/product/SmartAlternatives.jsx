import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import products from "../../data/products";

function SmartAlternatives({ product, language = "en" }) {
  const ro = language === "ro";

  const sameCategory = products.filter(
    (item) =>
      item.id !== product.id &&
      item.category === product.category,
  );

  const alternatives = sameCategory
    .sort(
      (a, b) =>
        Math.abs(Number(a.price) - Number(product.price)) -
        Math.abs(Number(b.price) - Number(product.price)),
    )
    .slice(0, 4);

  if (alternatives.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
            <Sparkles size={16} />
            SMART ALTERNATIVES
          </div>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
            {ro ? "Descoperă produse similare" : "Explore similar products"}
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            {ro
              ? "Alternative din aceeași categorie, selectate din catalogul demo."
              : "Alternatives from the same category, selected from the demo catalog."}
          </p>
        </div>

        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-black text-emerald-400 transition hover:text-emerald-300"
        >
          {ro ? "Toate produsele" : "All products"}
          <ArrowRight size={17} />
        </Link>
      </div>

      <div className="mt-8 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {alternatives.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}

export default SmartAlternatives;