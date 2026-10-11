import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useShop } from "../context/ShopContext";

function SearchBar({ compact = false }) {
  const navigate = useNavigate();

  const { t } = useLanguage();
  const { searchQuery, setSearchQuery } = useShop();

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = searchQuery.trim();

    if (value) {
      navigate(
        `/products?search=${encodeURIComponent(value)}`
      );
    } else {
      navigate("/products");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full items-center rounded-2xl border border-white/10 bg-white/[0.04] transition focus-within:border-emerald-400/50 focus-within:bg-white/[0.06] ${
        compact ? "h-11" : "h-12"
      }`}
    >
      <Search
        size={19}
        className="ml-4 shrink-0 text-zinc-500"
      />

      <input
        type="search"
        value={searchQuery}
        onChange={(event) =>
          setSearchQuery(event.target.value)
        }
        placeholder={t("search.placeholder")}
        className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-600"
      />

      <button
        type="submit"
        className="mr-1.5 rounded-xl bg-emerald-400 px-4 py-2 text-xs font-black text-black transition hover:bg-emerald-300"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;