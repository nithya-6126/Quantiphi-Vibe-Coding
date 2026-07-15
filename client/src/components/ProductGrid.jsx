import { PackageOpen } from "lucide-react";
import ProductCard from "../components/ui/ProductCard";

function ProductGrid({ products, total, loading, error, sortBy, sortOptions, onSortChange, onReset }) {
  return (
    <section>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Browse the inventory</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">{loading ? "Loading products..." : `${total} product${total === 1 ? "" : "s"}`}</h2>
        </div>
        <label className="text-sm font-semibold text-slate-700">Sort by
          <select value={sortBy} onChange={(event) => onSortChange(event.target.value)} className="mt-1.5 ml-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100">
            {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>

      {error ? <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-800">{error}</div> : null}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => <div key={index} className="h-80 animate-pulse rounded-2xl bg-slate-200" />)}
        </div>
      ) : !error && products.length === 0 ? (
        <div className="grid min-h-90 place-items-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <div><PackageOpen className="mx-auto mb-3 text-slate-400" size={40} /><h3 className="text-lg font-bold text-slate-950">No items match your criteria</h3><p className="mt-1 text-sm text-slate-500">Try a broader combination of filters.</p><button onClick={onReset} className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">Reset filters</button></div>
        </div>
      ) : !error ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : null}
    </section>
  );
}

export default ProductGrid;
