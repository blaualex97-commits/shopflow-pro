import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useShop } from "../context/ShopContext";

function Cart() {
  const { language, t } = useLanguage();

  const {
    cartItems,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
  } = useShop();

  const formatPrice = (price) =>
    new Intl.NumberFormat(
      language === "ro" ? "ro-RO" : "en-US",
      {
        style: "currency",
        currency: "RON",
        maximumFractionDigits: 0,
      }
    ).format(price);

  if (!cartItems.length) {
    return (
      <main className="grid min-h-[70vh] place-items-center px-6 text-center">
        <div>
          <ShoppingBag
            size={45}
            className="mx-auto text-zinc-700"
          />

          <h1 className="mt-6 text-3xl font-black">
            {t("cart.empty")}
          </h1>

          <Link
            to="/products"
            className="mt-7 inline-block rounded-xl bg-emerald-400 px-6 py-3 font-black text-black"
          >
            {t("cart.continue")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1300px] px-4 py-12 md:px-6">
      <h1 className="text-4xl font-black">
        {t("cart.title")}
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-[24px] border border-white/[0.07] bg-white/[0.03] p-4 sm:flex-row"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-32 w-full rounded-2xl object-cover sm:w-36"
              />

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                    {item.brand}
                  </p>

                  <h2 className="mt-2 text-lg font-black">
                    {item.title}
                  </h2>

                  <p className="mt-2 font-black text-emerald-400">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                      className="grid h-10 w-10 place-items-center"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="w-10 text-center font-black">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                      className="grid h-10 w-10 place-items-center"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="text-zinc-600 transition hover:text-red-400"
                  >
                    <Trash2 size={19} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-[26px] border border-white/[0.07] bg-white/[0.035] p-6">
          <h2 className="text-xl font-black">
            {t("checkout.orderSummary")}
          </h2>

          <div className="mt-6 flex justify-between text-zinc-400">
            <span>{t("cart.subtotal")}</span>
            <span>
              {formatPrice(cartSubtotal)}
            </span>
          </div>

          <div className="mt-4 flex justify-between text-zinc-400">
            <span>{t("checkout.shipping")}</span>
            <span className="font-bold text-emerald-400">
              {t("checkout.free")}
            </span>
          </div>

          <div className="my-6 border-t border-white/[0.08]" />

          <div className="flex justify-between text-xl font-black">
            <span>{t("checkout.total")}</span>
            <span>
              {formatPrice(cartSubtotal)}
            </span>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block rounded-2xl bg-emerald-400 py-4 text-center font-black text-black"
          >
            {t("cart.checkout")}
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;