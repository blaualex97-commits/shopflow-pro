import {
  CheckCircle2,
  CreditCard,
  MapPin,
  ShieldCheck,
  Store,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useShop } from "../context/ShopContext";

function Checkout() {
  const navigate = useNavigate();

  const { language, t } = useLanguage();

  const {
    cartItems,
    cartSubtotal,
    clearCart,
    createOrder,
  } = useShop();

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const formatPrice = (price = 0) =>
    new Intl.NumberFormat(
      language === "ro" ? "ro-RO" : "en-US",
      {
        style: "currency",
        currency: "RON",
        maximumFractionDigits: 2,
      }
    ).format(price);

  const text = {
    marketplaceCheckout:
      language === "ro"
        ? "Checkout marketplace"
        : "Marketplace checkout",

    deliveryDetails:
      language === "ro"
        ? "Date de livrare"
        : "Delivery details",

    payment:
      language === "ro"
        ? "Metodă de plată"
        : "Payment method",

    card:
      language === "ro"
        ? "Card online"
        : "Online card",

    cash:
      language === "ro"
        ? "Plată la livrare"
        : "Cash on delivery",

    demoPayment:
      language === "ro"
        ? "Checkout demonstrativ — nicio plată reală nu va fi procesată."
        : "Demo checkout — no real payment will be processed.",

    seller:
      language === "ro"
        ? "Seller"
        : "Seller",

    sellers:
      language === "ro"
        ? "Selleri"
        : "Sellers",

    verifiedSeller:
      language === "ro"
        ? "Seller verificat"
        : "Verified seller",

    free:
      language === "ro"
        ? "Gratuit"
        : "Free",

    subtotal:
      language === "ro"
        ? "Subtotal produse"
        : "Products subtotal",

    shipping:
      language === "ro"
        ? "Transport"
        : "Shipping",

    marketplaceTotal:
      language === "ro"
        ? "Total marketplace"
        : "Marketplace total",

    sellerSubtotal:
      language === "ro"
        ? "Subtotal seller"
        : "Seller subtotal",

    quantity:
      language === "ro"
        ? "Cantitate"
        : "Quantity",

    protected:
      language === "ro"
        ? "Checkout protejat"
        : "Protected checkout",

    protectedText:
      language === "ro"
        ? "Comanda este împărțită automat între sellerii selectați."
        : "Your order is automatically split between the selected sellers.",

    empty:
      language === "ro"
        ? "Coșul este gol."
        : "Your cart is empty.",

    continueShopping:
      language === "ro"
        ? "Continuă cumpărăturile"
        : "Continue shopping",

    processing:
      language === "ro"
        ? "Se creează comanda..."
        : "Creating order...",

    secureOrder:
      language === "ro"
        ? "Comandă securizată"
        : "Secure order",

    secureDescription:
      language === "ro"
        ? "Datele comenzii sunt salvate local pentru demonstrarea experienței complete ShopFlow."
        : "Order data is stored locally to demonstrate the complete ShopFlow experience.",

    viewProduct:
      language === "ro"
        ? "Vezi produsul"
        : "View product",
  };

  const sellerGroups = useMemo(() => {
    const groups = {};

    cartItems.forEach((item) => {
      const offer = item.selectedOffer;

      const seller =
        offer?.seller ||
        item.brand ||
        "ShopFlow";

      if (!groups[seller]) {
        groups[seller] = {
          seller,
          verified:
            offer?.verified || false,

          delivery:
            offer?.delivery?.label?.[language] ||
            null,

          shipping: 0,
          items: [],
        };
      }

      groups[seller].items.push(item);

      const itemShipping =
        Number(offer?.shipping || 0);

      groups[seller].shipping =
        Math.max(
          groups[seller].shipping,
          itemShipping
        );
    });

    return Object.values(groups).map(
      (group) => {
        const subtotal =
          group.items.reduce(
            (sum, item) =>
              sum +
              Number(item.price) *
                Number(item.quantity),
            0
          );

        return {
          ...group,
          subtotal,
          total:
            subtotal +
            group.shipping,
        };
      }
    );
  }, [cartItems, language]);

  const shippingTotal = useMemo(() => {
    return sellerGroups.reduce(
      (sum, group) =>
        sum + group.shipping,
      0
    );
  }, [sellerGroups]);

  const marketplaceTotal =
    cartSubtotal + shippingTotal;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !cartItems.length ||
      isSubmitting
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData =
        new FormData(
          event.currentTarget
        );

      const customer = {
        firstName:
          formData
            .get("firstName")
            ?.toString()
            .trim() || "",

        lastName:
          formData
            .get("lastName")
            ?.toString()
            .trim() || "",

        email:
          formData
            .get("email")
            ?.toString()
            .trim() || "",

        phone:
          formData
            .get("phone")
            ?.toString()
            .trim() || "",

        address:
          formData
            .get("address")
            ?.toString()
            .trim() || "",

        city:
          formData
            .get("city")
            ?.toString()
            .trim() || "",

        county:
          formData
            .get("county")
            ?.toString()
            .trim() || "",

        postalCode:
          formData
            .get("postalCode")
            ?.toString()
            .trim() || "",
      };

      const order = createOrder({
        customer,
        paymentMethod,
        shipping: shippingTotal,
      });

      if (!order) {
        setIsSubmitting(false);
        return;
      }

      clearCart();

      navigate(
        `/order-success?order=${encodeURIComponent(
          order.id
        )}`
      );
    } catch (error) {
      console.error(
        "Could not create order:",
        error
      );

      setIsSubmitting(false);
    }
  };

  if (!cartItems.length) {
    return (
      <main className="mx-auto grid min-h-[70vh] max-w-[900px] place-items-center px-4 py-12 md:px-6">
        <div className="text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-white/[0.06] bg-white/[0.04] text-zinc-600">
            <Store size={30} />
          </div>

          <h1 className="mt-6 text-3xl font-black">
            {text.empty}
          </h1>

          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
            className="mt-6 rounded-2xl bg-emerald-400 px-6 py-3.5 font-black text-black transition hover:bg-emerald-300"
          >
            {text.continueShopping}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-12 md:px-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
          ShopFlow Pro
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
          {t("checkout.title")}
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-500">
          {t("checkout.subtitle")}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 grid gap-8 xl:grid-cols-[1fr_460px]"
      >
        <div className="space-y-6">
          {/* DELIVERY */}
          <section className="rounded-[28px] border border-white/[0.07] bg-white/[0.03] p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <MapPin size={19} />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-400">
                  01
                </p>

                <h2 className="text-xl font-black">
                  {text.deliveryDetails}
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                [
                  "firstName",
                  t("checkout.firstName"),
                ],
                [
                  "lastName",
                  t("checkout.lastName"),
                ],
                [
                  "email",
                  t("checkout.email"),
                ],
                [
                  "phone",
                  t("checkout.phone"),
                ],
                [
                  "address",
                  t("checkout.address"),
                ],
                [
                  "city",
                  t("checkout.city"),
                ],
                [
                  "county",
                  t("checkout.county"),
                ],
                [
                  "postalCode",
                  t("checkout.postalCode"),
                ],
              ].map(([name, label]) => (
                <label
                  key={name}
                  className={
                    name === "address"
                      ? "sm:col-span-2"
                      : ""
                  }
                >
                  <span className="text-sm font-bold text-zinc-400">
                    {label}
                  </span>

                  <input
                    required
                    name={name}
                    type={
                      name === "email"
                        ? "email"
                        : name === "phone"
                          ? "tel"
                          : "text"
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0d1012] px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-700 focus:border-emerald-400/50"
                  />
                </label>
              ))}
            </div>
          </section>

          {/* PAYMENT */}
          <section className="rounded-[28px] border border-white/[0.07] bg-white/[0.03] p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <CreditCard size={19} />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-400">
                  02
                </p>

                <h2 className="text-xl font-black">
                  {text.payment}
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  setPaymentMethod(
                    "card"
                  )
                }
                className={`rounded-2xl border p-5 text-left transition ${
                  paymentMethod ===
                  "card"
                    ? "border-emerald-400/50 bg-emerald-400/[0.07]"
                    : "border-white/[0.07] bg-black/20 hover:border-white/15"
                }`}
              >
                <CreditCard
                  size={21}
                  className={
                    paymentMethod ===
                    "card"
                      ? "text-emerald-400"
                      : "text-zinc-500"
                  }
                />

                <p className="mt-4 font-black">
                  {text.card}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Visa • Mastercard
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setPaymentMethod(
                    "cash"
                  )
                }
                className={`rounded-2xl border p-5 text-left transition ${
                  paymentMethod ===
                  "cash"
                    ? "border-emerald-400/50 bg-emerald-400/[0.07]"
                    : "border-white/[0.07] bg-black/20 hover:border-white/15"
                }`}
              >
                <Truck
                  size={21}
                  className={
                    paymentMethod ===
                    "cash"
                      ? "text-emerald-400"
                      : "text-zinc-500"
                  }
                />

                <p className="mt-4 font-black">
                  {text.cash}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  ShopFlow Marketplace
                </p>
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-amber-400/15 bg-amber-400/[0.04] px-4 py-3 text-xs leading-5 text-amber-200/70">
              {text.demoPayment}
            </div>
          </section>

          {/* SELLERS */}
          <section>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
                ShopFlow Marketplace
              </p>

              <h2 className="mt-3 text-2xl font-black">
                {sellerGroups.length}{" "}
                {sellerGroups.length ===
                1
                  ? text.seller
                  : text.sellers}
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              {sellerGroups.map(
                (group) => (
                  <article
                    key={
                      group.seller
                    }
                    className="overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#101316]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] p-5">
                      <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.05] text-zinc-400">
                          <Store
                            size={
                              18
                            }
                          />
                        </div>

                        <div>
                          <p className="font-black">
                            {
                              group.seller
                            }
                          </p>

                          {group.verified && (
                            <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                              <ShieldCheck
                                size={
                                  13
                                }
                              />

                              {
                                text.verifiedSeller
                              }
                            </div>
                          )}
                        </div>
                      </div>

                      {group.delivery && (
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                          <Truck
                            size={
                              14
                            }
                          />

                          {
                            group.delivery
                          }
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 p-5">
                      {group.items.map(
                        (item) => (
                          <div
                            key={
                              item.cartKey
                            }
                            className="flex gap-4"
                          >
                            <Link
                              to={`/products/${item.id}`}
                              className="shrink-0"
                            >
                              <img
                                src={
                                  item.image
                                }
                                alt={
                                  item.title
                                }
                                className="h-20 w-20 rounded-xl object-cover transition duration-300 hover:scale-[1.03]"
                              />
                            </Link>

                            <div className="min-w-0 flex-1">
                              <Link
                                to={`/products/${item.id}`}
                                className="font-black transition hover:text-emerald-400"
                              >
                                {
                                  item.title
                                }
                              </Link>

                              <p className="mt-1 text-xs text-zinc-500">
                                {
                                  text.quantity
                                }
                                :{" "}
                                {
                                  item.quantity
                                }
                              </p>

                              <Link
                                to={`/products/${item.id}`}
                                className="mt-2 inline-block text-[11px] font-black uppercase tracking-wider text-emerald-400/70 transition hover:text-emerald-400"
                              >
                                {
                                  text.viewProduct
                                }
                              </Link>
                            </div>

                            <p className="shrink-0 font-black">
                              {formatPrice(
                                item.price *
                                  item.quantity
                              )}
                            </p>
                          </div>
                        )
                      )}
                    </div>

                    <div className="border-t border-white/[0.06] bg-black/20 px-5 py-4">
                      <div className="flex justify-between gap-4 text-sm">
                        <span className="text-zinc-500">
                          {
                            text.sellerSubtotal
                          }
                        </span>

                        <strong>
                          {formatPrice(
                            group.subtotal
                          )}
                        </strong>
                      </div>

                      <div className="mt-2 flex justify-between gap-4 text-sm">
                        <span className="text-zinc-500">
                          {
                            text.shipping
                          }
                        </span>

                        <strong
                          className={
                            group.shipping ===
                            0
                              ? "text-emerald-400"
                              : ""
                          }
                        >
                          {group.shipping ===
                          0
                            ? text.free
                            : formatPrice(
                                group.shipping
                              )}
                        </strong>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          </section>
        </div>

        {/* SUMMARY */}
        <aside className="h-fit xl:sticky xl:top-[100px]">
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#101316] p-6">
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-400/[0.05] blur-[70px]" />

            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400">
                {
                  text.marketplaceCheckout
                }
              </p>

              <h2 className="mt-2 text-2xl font-black">
                {t(
                  "checkout.orderSummary"
                )}
              </h2>

              <div className="mt-6 space-y-3">
                {cartItems.map(
                  (item) => (
                    <div
                      key={
                        item.cartKey
                      }
                      className="flex justify-between gap-4 text-sm"
                    >
                      <div className="min-w-0">
                        <Link
                          to={`/products/${item.id}`}
                          className="block truncate text-zinc-400 transition hover:text-white"
                        >
                          {
                            item.quantity
                          }
                          ×{" "}
                          {
                            item.title
                          }
                        </Link>

                        {item
                          .selectedOffer
                          ?.seller && (
                          <p className="mt-1 text-[11px] font-bold text-zinc-600">
                            {
                              item
                                .selectedOffer
                                .seller
                            }
                          </p>
                        )}
                      </div>

                      <span className="shrink-0 font-bold">
                        {formatPrice(
                          item.price *
                            item.quantity
                        )}
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="my-6 border-t border-white/[0.08]" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">
                    {text.subtotal}
                  </span>

                  <strong>
                    {formatPrice(
                      cartSubtotal
                    )}
                  </strong>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">
                    {text.shipping}
                  </span>

                  <strong
                    className={
                      shippingTotal ===
                      0
                        ? "text-emerald-400"
                        : ""
                    }
                  >
                    {shippingTotal ===
                    0
                      ? text.free
                      : formatPrice(
                          shippingTotal
                        )}
                  </strong>
                </div>
              </div>

              <div className="my-6 border-t border-white/[0.08]" />

              <div className="flex items-end justify-between gap-4">
                <span className="font-black">
                  {
                    text.marketplaceTotal
                  }
                </span>

                <span className="text-2xl font-black">
                  {formatPrice(
                    marketplaceTotal
                  )}
                </span>
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4">
                <div className="flex gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />

                  <div>
                    <p className="text-sm font-black">
                      {text.protected}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      {
                        text.protectedText
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-black/20 p-4">
                <ShieldCheck
                  size={17}
                  className="mt-0.5 shrink-0 text-zinc-500"
                />

                <div>
                  <p className="text-xs font-black text-zinc-300">
                    {
                      text.secureOrder
                    }
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-zinc-600">
                    {
                      text.secureDescription
                    }
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  !cartItems.length ||
                  isSubmitting
                }
                className="mt-6 w-full rounded-2xl bg-emerald-400 py-4 font-black text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting
                  ? text.processing
                  : t(
                      "checkout.placeOrder"
                    )}
              </button>
            </div>
          </div>
        </aside>
      </form>
    </main>
  );
}

export default Checkout;