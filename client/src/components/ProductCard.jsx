import { Star } from "lucide-react";
import { formatPrice } from "@/utils/formatters";

function ProductCard({ product }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <img src={product.image} alt={product.name} className="aspect-[4/3] w-full bg-slate-100 object-cover" />
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{product.category}</p>
        <h3 className="mt-1 min-h-12 text-base font-bold leading-6 text-slate-950">{product.name}</h3>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-slate-950">{formatPrice(product.price)}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-sm font-semibold text-amber-800"><Star size={14} className="fill-amber-400 text-amber-400" />{product.rating}</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
