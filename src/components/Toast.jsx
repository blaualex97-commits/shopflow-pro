import {
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useShop } from "../context/ShopContext";

function Toast() {
  const { toast } = useShop();

  if (!toast) return null;

  const error = toast.type === "error";

  return (
    <div className="fixed bottom-6 right-6 z-[150] flex max-w-[360px] items-center gap-3 rounded-2xl border border-white/10 bg-[#121619]/95 px-4 py-3 shadow-2xl backdrop-blur-xl">
      {error ? (
        <XCircle
          size={20}
          className="shrink-0 text-red-400"
        />
      ) : (
        <CheckCircle2
          size={20}
          className="shrink-0 text-emerald-400"
        />
      )}

      <p className="text-sm font-bold text-zinc-200">
        {toast.message}
      </p>
    </div>
  );
}

export default Toast;