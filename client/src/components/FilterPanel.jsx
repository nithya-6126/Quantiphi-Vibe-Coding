import { RotateCcw, Star } from "lucide-react";

function FilterPanel({ filters, metadata, onChange, onClear }) {
  const update = (patch) => onChange((current) => ({ ...current, ...patch }));
  const range = metadata?.priceRange;
  const minPrice = filters.minPrice === "" ? range?.min ?? 0 : Number(filters.minPrice);
  const maxPrice = filters.maxPrice === "" ? range?.max ?? 0 : Number(filters.maxPrice);

  const toggleCategory = (category) => {
    const categories = filters.categories.includes(category)
      ? filters.categories.filter((item) => item !== category)
      : [...filters.categories, category];
    update({ categories });
  };

  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-950">Filters</h2>
        <button onClick={onClear} className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-900">
          <RotateCcw size={14} /> Clear all
        </button>
      </div>

      <fieldset className="border-0 p-0">
        <legend className="mb-3 text-sm font-semibold text-slate-900">Category</legend>
        <div className="space-y-2.5">
          {(metadata?.categories ?? []).map((category) => (
            <label key={category} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
              <input type="checkbox" checked={filters.categories.includes(category)} onChange={() => toggleCategory(category)} className="size-4 rounded border-slate-300 accent-sky-700" />
              {category}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="my-6 border-t border-slate-200" />
      <fieldset className="border-0 p-0">
        <legend className="mb-3 text-sm font-semibold text-slate-900">Price range</legend>
        <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-700">
          <span>${minPrice}</span><span>${maxPrice}</span>
        </div>
        <div className="relative h-6">
          <input aria-label="Minimum price" type="range" min={range?.min ?? 0} max={range?.max ?? 0} value={minPrice} onChange={(event) => update({ minPrice: String(Math.min(Number(event.target.value), maxPrice)) })} className="absolute inset-x-0 top-0 w-full accent-sky-700" />
          <input aria-label="Maximum price" type="range" min={range?.min ?? 0} max={range?.max ?? 0} value={maxPrice} onChange={(event) => update({ maxPrice: String(Math.max(Number(event.target.value), minPrice)) })} className="absolute inset-x-0 top-0 w-full accent-sky-700" />
        </div>
        <p className="mt-1 text-xs text-slate-500">Move either slider to set the price bounds.</p>
      </fieldset>

      <div className="my-6 border-t border-slate-200" />
      <fieldset className="border-0 p-0">
        <legend className="mb-3 text-sm font-semibold text-slate-900">Minimum rating</legend>
        <div className="space-y-2.5">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
            <input type="radio" name="rating" checked={filters.minRating === ""} onChange={() => update({ minRating: "" })} className="size-4 accent-sky-700" /> Any rating
          </label>
          {(metadata?.ratingOptions ?? []).map((rating) => (
            <label key={rating} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
              <input type="radio" name="rating" value={rating} checked={Number(filters.minRating) === rating} onChange={() => update({ minRating: String(rating) })} className="size-4 accent-sky-700" />
              <span className="flex items-center gap-1">{rating}+ <Star size={14} className="fill-amber-400 text-amber-400" /></span>
            </label>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}

export default FilterPanel;
