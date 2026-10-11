import { useEffect, useState } from "react";
import {
  Bell,
  BellRing,
  CheckCircle2,
  Trash2,
} from "lucide-react";

const STORAGE_KEY = "shopflow_price_alerts";

function readAlerts() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    return stored && typeof stored === "object" && !Array.isArray(stored)
      ? stored
      : {};
  } catch {
    return {};
  }
}

function PriceAlert({ product, currentPrice, language = "en" }) {
  const ro = language === "ro";
  const productKey = String(product.id);

  const [alerts, setAlerts] = useState(readAlerts);
  const [targetPrice, setTargetPrice] = useState("");
  const [message, setMessage] = useState("");

  const existingAlert = alerts[productKey] || null;

  useEffect(() => {
    setTargetPrice("");
    setMessage("");
  }, [productKey]);

  const formatPrice = (price) =>
    new Intl.NumberFormat(ro ? "ro-RO" : "en-US", {
      style: "currency",
      currency: "RON",
      maximumFractionDigits: 0,
    }).format(price);

  const saveAlerts = (nextAlerts) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAlerts));
      setAlerts(nextAlerts);
      return true;
    } catch {
      setMessage(
        ro
          ? "Alerta nu a putut fi salvată în acest browser."
          : "The alert could not be saved in this browser.",
      );
      return false;
    }
  };

  const handleSave = (event) => {
    event.preventDefault();

    const parsedPrice = Number(targetPrice.trim().replace(",", "."));

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setMessage(
        ro
          ? "Introdu un preț țintă valid, mai mare decât zero."
          : "Enter a valid target price greater than zero.",
      );
      return;
    }

    const nextAlerts = {
      ...alerts,
      [productKey]: {
        productId: product.id,
        productTitle: product.title,
        targetPrice: parsedPrice,
        createdAt: new Date().toISOString(),
      },
    };

    if (saveAlerts(nextAlerts)) {
      setTargetPrice("");
      setMessage(
        ro
          ? "Pragul de preț a fost salvat local."
          : "Your target price was saved locally.",
      );
    }
  };

  const handleRemove = () => {
    const nextAlerts = { ...alerts };
    delete nextAlerts[productKey];

    if (saveAlerts(nextAlerts)) {
      setMessage(
        ro
          ? "Alerta locală a fost eliminată."
          : "The local alert was removed.",
      );
    }
  };

  const targetReached =
    existingAlert &&
    Number.isFinite(Number(currentPrice)) &&
    Number(currentPrice) <= Number(existingAlert.targetPrice);

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_right,rgba(56,207,245,0.08),transparent_60%),#101619] p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
            <BellRing size={16} />
            PRICE ALERT
          </div>

          <h3 className="mt-3 text-2xl font-black tracking-tight text-white">
            {ro ? "Setează prețul tău țintă" : "Set your target price"}
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
            {ro
              ? "Salvează un prag pentru acest produs și verifică-l când revii pe pagină."
              : "Save a target for this product and check it when you return to this page."}
          </p>
        </div>

        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-300">
          <Bell size={22} />
        </div>
      </div>

      {existingAlert && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.05] p-4">
          <div>
            <p className="text-xs font-bold text-zinc-500">
              {ro ? "Pragul tău salvat" : "Your saved target"}
            </p>

            <p className="mt-1 text-2xl font-black text-white">
              {formatPrice(existingAlert.targetPrice)}
            </p>

            <p
              className={`mt-2 flex items-center gap-1.5 text-xs font-bold ${
                targetReached ? "text-emerald-300" : "text-zinc-500"
              }`}
            >
              {targetReached && <CheckCircle2 size={14} />}

              {targetReached
                ? ro
                  ? "Prețul disponibil din datele locale este la pragul tău sau sub el."
                  : "The locally listed available price meets your target."
                : ro
                  ? "Pragul nu este atins în datele locale actuale."
                  : "The target is not met in the current local data."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-zinc-300 transition hover:border-red-400/30 hover:text-red-300"
          >
            <Trash2 size={15} />
            {ro ? "Elimină" : "Remove"}
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="mt-6">
        <label
          htmlFor={`price-alert-${product.id}`}
          className="mb-2 block text-xs font-bold text-zinc-400"
        >
          {ro ? "Preț țintă (RON)" : "Target price (RON)"}
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id={`price-alert-${product.id}`}
            type="number"
            min="0.01"
            step="0.01"
            inputMode="decimal"
            value={targetPrice}
            onChange={(event) => {
              setTargetPrice(event.target.value);
              setMessage("");
            }}
            placeholder={String(
              Math.max(1, Math.floor(Number(currentPrice || product.price) * 0.9)),
            )}
            className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#090e11] px-4 py-3.5 font-bold text-white outline-none transition placeholder:text-zinc-700 focus:border-emerald-400/50"
          />

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3.5 font-black text-black transition hover:bg-emerald-300"
          >
            <Bell size={17} />
            {existingAlert
              ? ro
                ? "Actualizează pragul"
                : "Update target"
              : ro
                ? "Salvează pragul"
                : "Save target"}
          </button>
        </div>

        {message && (
          <p role="status" className="mt-3 text-sm text-emerald-300">
            {message}
          </p>
        )}
      </form>

      <p className="mt-5 border-t border-white/[0.07] pt-4 text-xs leading-5 text-zinc-600">
        {ro
          ? "Funcție demo: pragul este salvat doar în acest browser. Nu există monitorizare în fundal, notificări sau actualizări live ale prețurilor."
          : "Demo feature: your target is saved only in this browser. There is no background monitoring, notification delivery or live price updating."}
      </p>
    </section>
  );
}

export default PriceAlert;