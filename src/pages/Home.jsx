import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useLanguage } from "../context/LanguageContext";
import categories from "../data/categories";
import products from "../data/products";

function Home() {
  const { t } = useLanguage();

  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 8);

  // Fallback: dacă featured nu există sau nu găsește produse,
  // afișăm primele 8 produse.
  const productsToShow =
    featuredProducts.length > 0
      ? featuredProducts
      : products.slice(0, 8);

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-[1500px] px-4 py-20 md:px-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
            ShopFlow Categories
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
            {t("sections.categoriesTitle")}
          </h2>

          <p className="mt-3 max-w-2xl text-zinc-500">
            {t("sections.categoriesSubtitle")}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="mx-auto max-w-[1500px] px-4 py-20 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
                Trending
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                {t("sections.featuredTitle")}
              </h2>

              <p className="mt-3 text-zinc-500">
                {t("sections.featuredSubtitle")}
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-black text-emerald-400 hover:text-emerald-300"
            >
              {t("sections.viewAll")}
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productsToShow.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;