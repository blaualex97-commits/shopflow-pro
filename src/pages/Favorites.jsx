import {
  ArrowRight,
  Heart,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLanguage } from "../context/LanguageContext";
import { useShop } from "../context/ShopContext";

function Favorites() {
  const { language, t } = useLanguage();
  const { favoriteProducts } = useShop();

  const text = {
    eyebrow:
      language === "ro"
        ? "Colecția ta"
        : "Your collection",

    saved:
      language === "ro"
        ? `${favoriteProducts.length} produse salvate`
        : `${favoriteProducts.length} saved products`,

    smartText:
      language === "ro"
        ? "Produsele salvate aici vor putea fi urmărite ulterior pentru scăderi de preț, stoc și oferte mai bune."
        : "Products saved here will later support price-drop, stock and better-offer tracking.",

    explore:
      language === "ro"
        ? "Explorează marketplace-ul"
        : "Explore marketplace",
  };

  return (
    <main className="mx-auto min-h-[70vh] max-w-[1500px] px-4 py-12 md:px-6">
      <section className="relative overflow-hidden rounded-[34px] border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-white/[0.015] px-6 py-8 md:px-8">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/[0.07] blur-[90px]" />

        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
              <Sparkles size={15} />
              {text.eyebrow}
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              {t("favorites.title")}
            </h1>

            <p className="mt-3 max-w-2xl text-zinc-500">
              {t("favorites.subtitle")}
            </p>
          </div>

          {favoriteProducts.length > 0 && (
            <div className="rounded-2xl border border-white/[0.07] bg-black/20 px-4 py-3">
              <p className="text-xs font-black text-emerald-400">
                {text.saved}
              </p>
            </div>
          )}
        </div>
      </section>

      {favoriteProducts.length ? (
        <>
          <div className="mt-6 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.035] px-4 py-3 text-sm text-zinc-400">
            {text.smartText}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-[32px] border border-dashed border-white/10 bg-white/[0.015] px-6 py-20 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full border border-white/[0.07] bg-white/[0.035] text-zinc-600">
            <Heart size={34} />
          </div>

          <h2 className="mt-6 text-2xl font-black">
            {t("favorites.empty")}
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
            {language === "ro"
              ? "Salvează produsele care te interesează și revino rapid la ele."
              : "Save products you care about and return to them quickly."}
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-6 py-3.5 font-black text-black transition hover:bg-emerald-300"
          >
            {text.explore}
            <ArrowRight size={17} />
          </Link>
        </div>
      )}
    </main>
  );
}

export default Favorites;