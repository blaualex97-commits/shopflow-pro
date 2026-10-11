
import {
  Heart,
  Home,
  Menu,
  Search,
  ShoppingBag,
  Tag,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useShop } from "../context/ShopContext";
import LanguageSelector from "./LanguageSelector";
import SearchBar from "./SearchBar";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const location = useLocation();

  const { t } = useLanguage();

  const {
    cartCount,
    favorites,
    setIsCartOpen,
  } = useShop();

  const navClass = ({ isActive }) =>
    `relative text-sm font-black transition ${
      isActive
        ? "text-white"
        : "text-zinc-500 hover:text-white"
    }`;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActivePath = (path) =>
    location.pathname === path;

  return (
    <>
      <header
        className="
          sticky top-0 z-40
          border-b border-white/[0.06]
          bg-[#070a0c]/86
          backdrop-blur-2xl
          supports-[backdrop-filter]:bg-[#070a0c]/74
        "
      >
        {/* DESKTOP / TABLET TOP BAR */}
        <div className="mx-auto w-full max-w-[1500px] px-3 sm:px-4 md:px-5 lg:px-6">
          <div
            className="
              flex min-h-[68px] items-center gap-3
              sm:min-h-[72px]
              lg:min-h-[78px]
            "
          >
            {/* BRAND */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="group flex shrink-0 items-center gap-3"
            >
              <div
                className="
                  relative grid
                  h-10 w-10
                  place-items-center
                  overflow-hidden
                  rounded-[14px]
                  bg-emerald-400
                  font-black
                  text-black
                  shadow-[0_0_30px_rgba(32,227,162,0.10)]
                  transition
                  duration-300
                  group-hover:scale-[1.03]
                  group-hover:shadow-[0_0_38px_rgba(32,227,162,0.16)]
                  sm:h-11 sm:w-11
                "
              >
                <span className="relative z-10">
                  S
                </span>

                <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-white/10" />
              </div>

              <div className="hidden min-w-0 sm:block">
                <p className="truncate text-[15px] font-black tracking-tight lg:text-base">
                  ShopFlow
                  <span className="text-emerald-400">
                    {" "}
                    Pro
                  </span>
                </p>

                <p
                  className="
                    mt-0.5 hidden
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-zinc-700
                    lg:block
                  "
                >
                  {t("brand.tagline")}
                </p>
              </div>
            </Link>

            {/* SEARCH DESKTOP */}
            <div
              className="
                hidden min-w-0 flex-1
                md:block
                xl:max-w-[660px]
              "
            >
              <SearchBar compact />
            </div>

            {/* DESKTOP NAV */}
            <nav
              className="
                ml-auto hidden
                items-center
                gap-5
                xl:flex
                2xl:gap-6
              "
            >
              <NavLink
                to="/"
                end
                className={navClass}
              >
                {({ isActive }) => (
                  <span className="relative">
                    {t("nav.home")}

                    {isActive && (
                      <span className="absolute -bottom-3 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(32,227,162,0.8)]" />
                    )}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/products"
                className={navClass}
              >
                {({ isActive }) => (
                  <span className="relative">
                    {t("nav.products")}

                    {isActive && (
                      <span className="absolute -bottom-3 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(32,227,162,0.8)]" />
                    )}
                  </span>
                )}
              </NavLink>

              <Link
                to="/products?sort=discount"
                className="text-sm font-black text-zinc-500 transition hover:text-white"
              >
                {t("nav.deals")}
              </Link>
            </nav>

            {/* ACTIONS */}
            <div className="ml-auto flex items-center gap-2">
              <div className="hidden lg:block">
                <LanguageSelector />
              </div>

              <Link
                to="/favorites"
                className="
                  relative grid
                  h-10 w-10
                  place-items-center
                  rounded-[13px]
                  border border-white/[0.08]
                  bg-white/[0.035]
                  text-zinc-400
                  transition
                  duration-200
                  hover:border-emerald-400/20
                  hover:bg-emerald-400/[0.045]
                  hover:text-white
                  sm:h-11 sm:w-11
                "
                aria-label={t("nav.favorites")}
              >
                <Heart size={18} />

                {favorites.length > 0 && (
                  <span
                    className="
                      absolute -right-1.5 -top-1.5
                      grid min-h-5 min-w-5
                      place-items-center
                      rounded-full
                      border-2 border-[#070a0c]
                      bg-emerald-400
                      px-1
                      text-[9px]
                      font-black
                      text-black
                    "
                  >
                    {favorites.length}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() =>
                  setIsCartOpen(true)
                }
                className="
                  relative grid
                  h-10 w-10
                  place-items-center
                  rounded-[13px]
                  border border-white/[0.08]
                  bg-white/[0.035]
                  text-zinc-400
                  transition
                  duration-200
                  hover:border-emerald-400/20
                  hover:bg-emerald-400/[0.045]
                  hover:text-white
                  sm:h-11 sm:w-11
                "
                aria-label="Cart"
              >
                <ShoppingBag size={18} />

                {cartCount > 0 && (
                  <span
                    className="
                      absolute -right-1.5 -top-1.5
                      grid min-h-5 min-w-5
                      place-items-center
                      rounded-full
                      border-2 border-[#070a0c]
                      bg-emerald-400
                      px-1
                      text-[9px]
                      font-black
                      text-black
                    "
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              <Link
                to="/account"
                className="
                  hidden h-11
                  items-center gap-2
                  rounded-[13px]
                  border border-white/[0.08]
                  bg-white/[0.035]
                  px-3
                  text-sm
                  font-black
                  text-zinc-400
                  transition
                  hover:border-white/[0.13]
                  hover:bg-white/[0.06]
                  hover:text-white
                  md:flex
                "
              >
                <UserRound size={17} />

                <span className="hidden 2xl:inline">
                  {t("nav.account")}
                </span>
              </Link>

              {/* TABLET MENU */}
              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen(
                    (current) => !current
                  )
                }
                className="
                  hidden h-11 w-11
                  place-items-center
                  rounded-[13px]
                  border border-white/[0.08]
                  bg-white/[0.035]
                  text-zinc-300
                  md:grid
                  xl:hidden
                "
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X size={19} />
                ) : (
                  <Menu size={19} />
                )}
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH */}
          <div className="pb-3 md:hidden">
            <SearchBar compact />
          </div>

          {/* TABLET DROPDOWN */}
          {mobileMenuOpen && (
            <div
              className="
                hidden
                border-t border-white/[0.06]
                pb-4 pt-3
                md:block
                xl:hidden
              "
            >
              <div className="grid gap-2 md:grid-cols-4">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-4 py-3 text-sm font-black text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
                >
                  {t("nav.home")}
                </Link>

                <Link
                  to="/products"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-4 py-3 text-sm font-black text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
                >
                  {t("nav.products")}
                </Link>

                <Link
                  to="/products?sort=discount"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-4 py-3 text-sm font-black text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
                >
                  {t("nav.deals")}
                </Link>

                <div className="lg:hidden">
                  <LanguageSelector />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MOBILE APP BOTTOM NAV */}
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          border-t border-white/[0.07]
          bg-[#080b0d]/92
          px-2
          pb-[max(8px,env(safe-area-inset-bottom))]
          pt-2
          backdrop-blur-2xl
          md:hidden
        "
      >
        <div className="mx-auto grid max-w-[520px] grid-cols-5 gap-1">
          <MobileNavItem
            to="/"
            icon={Home}
            label={t("nav.home")}
            active={isActivePath("/")}
          />

          <MobileNavItem
            to="/products"
            icon={Search}
            label={t("nav.products")}
            active={
              location.pathname.startsWith(
                "/products"
              ) &&
              !location.search.includes(
                "sort=discount"
              )
            }
          />

          <MobileNavItem
            to="/products?sort=discount"
            icon={Tag}
            label={t("nav.deals")}
            active={location.search.includes(
              "sort=discount"
            )}
          />

          <MobileNavItem
            to="/favorites"
            icon={Heart}
            label={t("nav.favorites")}
            active={isActivePath(
              "/favorites"
            )}
            badge={favorites.length}
          />

          <MobileNavItem
            to="/account"
            icon={UserRound}
            label={t("nav.account")}
            active={isActivePath(
              "/account"
            )}
          />
        </div>
      </nav>
    </>
  );
}

function MobileNavItem({
  to,
  icon: Icon,
  label,
  active,
  badge = 0,
}) {
  return (
    <Link
      to={to}
      className={`
        relative flex min-w-0 flex-col
        items-center justify-center
        gap-1
        rounded-[14px]
        px-1 py-2
        text-[10px]
        font-black
        transition
        ${
          active
            ? "bg-emerald-400/[0.09] text-emerald-400"
            : "text-zinc-600"
        }
      `}
    >
      <div className="relative">
        <Icon
          size={19}
          strokeWidth={
            active ? 2.4 : 2
          }
        />

        {badge > 0 && (
          <span
            className="
              absolute -right-2.5 -top-2
              grid min-h-4 min-w-4
              place-items-center
              rounded-full
              bg-emerald-400
              px-1
              text-[8px]
              font-black
              text-black
            "
          >
            {badge}
          </span>
        )}
      </div>

      <span className="max-w-full truncate">
        {label}
      </span>

      {active && (
        <span className="absolute bottom-0 h-[2px] w-5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(32,227,162,0.6)]" />
      )}
    </Link>
  );
}

export default Header;