import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <p className="text-sm font-black tracking-[0.3em] text-emerald-400">
          ERROR 404
        </p>

        <h1 className="mt-4 text-5xl font-black">
          {t("notFound.title")}
        </h1>

        <p className="mt-4 text-zinc-500">
          {t("notFound.description")}
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-xl bg-emerald-400 px-6 py-3 font-black text-black"
        >
          {t("notFound.home")}
        </Link>
      </div>
    </main>
  );
}

export default NotFound;