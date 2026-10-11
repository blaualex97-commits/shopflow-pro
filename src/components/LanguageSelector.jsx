import { Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1">
      <Languages
        size={16}
        className="ml-2 text-zinc-500"
      />

      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-lg px-2.5 py-1.5 text-xs font-black transition ${
          language === "en"
            ? "bg-emerald-400 text-black"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => setLanguage("ro")}
        className={`rounded-lg px-2.5 py-1.5 text-xs font-black transition ${
          language === "ro"
            ? "bg-emerald-400 text-black"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        RO
      </button>
    </div>
  );
}

export default LanguageSelector;