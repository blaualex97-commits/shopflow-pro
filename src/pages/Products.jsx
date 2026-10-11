import {
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useMemo } from "react";
import {
  useSearchParams,
} from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLanguage } from "../context/LanguageContext";
import categories from "../data/categories";
import products from "../data/products";

function Products() {
  const { language, t } = useLanguage();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const search =
    searchParams.get("search") || "";

  const category =
    searchParams.get("category") || "all";

  const sort =
    searchParams.get("sort") || "featured";

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((product) => {
        return (
          product.title
            .toLowerCase()
            .includes(query) ||
          product.brand
            .toLowerCase()
            .includes(query) ||
          product.description[language]
            .toLowerCase()
            .includes(query)
        );
      });
    }

    if (category !== "all") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort(
        (a, b) => b.rating - a.rating
      );
    }

    if (sort === "discount") {
      result.sort((a, b) => {
        const discountA =
          (a.oldPrice - a.price) / a.oldPrice;

        const discountB =
          (b.oldPrice - b.price) / b.oldPrice;

        return discountB - discountA;
      });
    }

    if (sort === "featured") {
      result.sort(
        (a, b) =>
          Number(b.featured) -
          Number(a.featured)
      );
    }

    return result;
  }, [search, category, sort, language]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(
      searchParams
    );

    if (
      !value ||
      value === "all" ||
      value === "featured"
    ) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <main className="mx-auto min-h-screen max-w-[1500px] px-4 py-12 md:px-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
          ShopFlow Marketplace
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
          {t("products.title")}
        </h1>

        <p className="mt-4 text-zinc-500">
          {t("products.subtitle")}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-2 text-sm font-black text-zinc-400">
          <SlidersHorizontal size={18} />
          Filters
        </div>

        <select
          value={category}
          onChange={(event) =>
            updateParam(
              "category",
              event.target.value
            )
          }
          className="rounded-xl border border-white/10 bg-[#101316] px-4 py-3 text-sm font-bold text-zinc-300 outline-none"
        >
          <option value="all">
            {t("products.allCategories")}
          </option>

          {categories.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.name[language]}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) =>
            updateParam(
              "sort",
              event.target.value
            )
          }
          className="rounded-xl border border-white/10 bg-[#101316] px-4 py-3 text-sm font-bold text-zinc-300 outline-none"
        >
          <option value="featured">
            {t("products.featured")}
          </option>

          <option value="price-low">
            {t("products.priceLow")}
          </option>

          <option value="price-high">
            {t("products.priceHigh")}
          </option>

          <option value="rating">
            {t("products.rating")}
          </option>

          <option value="discount">
            Deals
          </option>
        </select>

        {(search ||
          category !== "all" ||
          sort !== "featured") && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-zinc-500 hover:text-white"
          >
            <X size={16} />
            {t("products.clearFilters")}
          </button>
        )}

        <div className="lg:ml-auto">
          <span className="text-sm font-bold text-zinc-600">
            {filteredProducts.length} products
          </span>
        </div>
      </div>

      {search && (
        <p className="mt-6 text-sm text-zinc-500">
          Results for{" "}
          <span className="font-bold text-white">
            “{search}”
          </span>
        </p>
      )}

      {filteredProducts.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-[30px] border border-dashed border-white/10 py-24 text-center">
          <h2 className="text-2xl font-black">
            {t("products.noResults")}
          </h2>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-xl bg-emerald-400 px-5 py-3 font-black text-black"
          >
            {t("products.clearFilters")}
          </button>
        </div>
      )}
    </main>
  );
}

export default Products;