import {
  ArrowRight,
  CheckCircle2,
  PackageCheck,
  ReceiptText,
  ShieldCheck,
  Store,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useShop } from "../context/ShopContext";

function OrderSuccess() {
  const { language, t } = useLanguage();
  const { getOrderById } = useShop();

  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("order");
  const order = orderId
    ? getOrderById(orderId)
    : null;

  const formatPrice = (price = 0) =>
    new Intl.NumberFormat(
      language === "ro" ? "ro-RO" : "en-US",
      {
        style: "currency",
        currency: "RON",
        maximumFractionDigits: 2,
      }
    ).format(price);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Intl.DateTimeFormat(
      language === "ro" ? "ro-RO" : "en-US",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    ).format(new Date(date));
  };

  const text = {
    eyebrow:
      language === "ro"
        ? "Comandă confirmată"
        : "Order confirmed",

    success:
      language === "ro"
        ? "Comanda ta a fost creată cu succes."
        : "Your order has been created successfully.",

    description:
      language === "ro"
        ? "ShopFlow a salvat comanda și a împărțit automat produsele între sellerii selectați."
        : "ShopFlow saved your order and automatically split the products between your selected sellers.",

    orderId:
      language === "ro"
        ? "ID comandă"
        : "Order ID",

    placed:
      language === "ro"
        ? "Plasată la"
        : "Placed at",

    total:
      language === "ro"
        ? "Total"
        : "Total",

    sellers:
      language === "ro"
        ? "Selleri"
        : "Sellers",

    products:
      language === "ro"
        ? "Produse"
        : "Products",

    viewOrders:
      language === "ro"
        ? "Vezi comenzile"
        : "View orders",

    continue:
      language === "ro"
        ? "Continuă cumpărăturile"
        : "Continue shopping",

    demo:
      language === "ro"
        ? "Comandă demo — nu a fost procesată nicio plată reală."
        : "Demo order — no real payment was processed.",

    notFound:
      language === "ro"
        ? "Comanda nu a putut fi găsită."
        : "Order could not be found.",

    notFoundDescription:
      language === "ro"
        ? "Poți continua cumpărăturile sau poți verifica istoricul comenzilor din cont."
        : "You can continue shopping or check your order history from your account.",
  };

  if (!order) {
    return (
      <main className="grid min-h-[70vh] place-items-center px-4 py-16 md:px-6">
        <div className="w-full max-w-2xl rounded-[32px] border border-white/[0.07] bg-white/[0.03] p-8 text-center md:p-10">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-white/[0.07] bg-white/[0.04] text-zinc-500">
            <ReceiptText size={32} />
          </div>

          <h1 className="mt-6 text-3xl font-black">
            {text.notFound}
          </h1>

          <p className="mx-auto mt-3 max-w-lg leading-7 text-zinc-500">
            {text.notFoundDescription}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/account"
              className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-6 py-3.5 font-black text-white transition hover:border-white/15 hover:bg-white/[0.06]"
            >
              {text.viewOrders}
            </Link>

            <Link
              to="/products"
              className="rounded-2xl bg-emerald-400 px-6 py-3.5 font-black text-black transition hover:bg-emerald-300"
            >
              {text.continue}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const sellerCount = new Set(
    order.items.map(
      (item) => item.seller
    )
  ).size;

  const productsCount =
    order.items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  return (
    <main className="mx-auto min-h-[70vh] max-w-[1100px] px-4 py-14 md:px-6">
      <section className="relative overflow-hidden rounded-[36px] border border-white/[0.07] bg-[#101316] p-7 md:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/[0.08] blur-[100px]" />

        <div className="relative">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
            <CheckCircle2 size={46} />
          </div>

          <div className="mt-7 text-center">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-400">
              {text.eyebrow}
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              {text.success}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-500">
              {text.description}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
              <ReceiptText
                size={20}
                className="text-emerald-400"
              />

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-zinc-600">
                {text.orderId}
              </p>

              <p className="mt-1 font-black">
                {order.id}
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
              <PackageCheck
                size={20}
                className="text-emerald-400"
              />

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-zinc-600">
                {text.products}
              </p>

              <p className="mt-1 font-black">
                {productsCount}
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
              <Store
                size={20}
                className="text-emerald-400"
              />

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-zinc-600">
                {text.sellers}
              </p>

              <p className="mt-1 font-black">
                {sellerCount}
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
              <ShieldCheck
                size={20}
                className="text-emerald-400"
              />

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-zinc-600">
                {text.total}
              </p>

              <p className="mt-1 font-black text-emerald-400">
                {formatPrice(order.total)}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/20 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                  {text.placed}
                </p>

                <p className="mt-1 font-black">
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <div className="rounded-xl border border-amber-400/15 bg-amber-400/[0.04] px-4 py-3 text-xs font-bold text-amber-200/70">
                {text.demo}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/account"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-6 py-3.5 font-black text-white transition hover:border-white/15 hover:bg-white/[0.06]"
            >
              {text.viewOrders}
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-6 py-3.5 font-black text-black transition hover:bg-emerald-300"
            >
              {text.continue}
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OrderSuccess;