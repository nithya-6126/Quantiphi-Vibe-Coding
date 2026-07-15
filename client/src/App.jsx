import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { fetchProductMetadata, fetchProducts } from "./api/products";
import FilterPanel from "./components/FilterPanel";
import ProductGrid from "./components/ProductGrid";

const initialFilters = {
  categories: [],
  minPrice: "",
  maxPrice: "",
  minRating: "",
  sortBy: "",
};

function App() {
  const [filters, setFilters] = useState(initialFilters);
  const [metadata, setMetadata] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchProductMetadata()
      .then((data) => {
        if (active) setMetadata(data);
      })
      .catch(() => {
        if (active) setError("The product filters could not be loaded.");
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    fetchProducts(filters)
      .then((result) => {
        if (!active) return;
        setProducts(result.products);
        setTotal(result.total);
      })
      .catch(() => {
        if (active) setError("We couldn't load the catalog. Make sure the server is running.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [filters]);

  const resetFilters = () => setFilters(initialFilters);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid size-10 place-items-center rounded-xl bg-slate-900 text-white">
            <SlidersHorizontal size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Quantiphi Market</p>
            <h1 className="text-xl font-bold tracking-tight text-slate-950">Product catalog</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <FilterPanel
          filters={filters}
          metadata={metadata}
          onChange={setFilters}
          onClear={resetFilters}
        />
        <ProductGrid
          products={products}
          total={total}
          loading={loading}
          error={error}
          sortBy={filters.sortBy}
          sortOptions={metadata?.sortOptions ?? []}
          onSortChange={(sortBy) => setFilters((current) => ({ ...current, sortBy }))}
          onReset={resetFilters}
        />
      </div>
    </main>
  );
}

export default App;
