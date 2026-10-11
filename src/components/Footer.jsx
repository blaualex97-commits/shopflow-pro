import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-24 border-t border-white/[0.07] bg-[#080a0c]">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-4 py-14 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400 font-black text-black">
              S
            </div>

            <div>
              <p className="font-black">
                ShopFlow
                <span className="text-emerald-400"> Pro</span>
              </p>

              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-600">
                {t("brand.tagline")}
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-500">
            {t("footer.description")}
          </p>
        </div>

        <div>
          <h3 className="font-black">
            {t("footer.marketplace")}
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-sm text-zinc-500">
            <Link
              to="/products"
              className="hover:text-white"
            >
              {t("footer.products")}
            </Link>

            <Link
              to="/favorites"
              className="hover:text-white"
            >
              {t("footer.favorites")}
            </Link>

            <Link
              to="/account"
              className="hover:text-white"
            >
              {t("footer.account")}
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-black">
            {t("footer.support")}
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-sm text-zinc-500">
            <span>{t("footer.shipping")}</span>
            <span>{t("footer.returns")}</span>
            <span>{t("footer.help")}</span>
          </div>
        </div>

        <div>
          <h3 className="font-black">
            Alexandru Filip
          </h3>

          <p className="mt-5 text-sm font-bold text-emerald-400">
            {t("footer.builtBy")}
          </p>

          <p className="mt-2 text-sm leading-6 text-zinc-600">
            {t("footer.stack")}
          </p>

          <a
            href="https://github.com/blaualex97-commits"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="border-t border-white/[0.06] py-5 text-center text-xs text-zinc-700">
        © {new Date().getFullYear()} ShopFlow Pro • Alexandru Filip
      </div>
    </footer>
  );
}

export default Footer;