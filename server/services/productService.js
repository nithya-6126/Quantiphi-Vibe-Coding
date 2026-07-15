import { products, CATEGORIES } from "../data/products.js";

const SORT_OPTIONS = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "rating-desc": (a, b) => b.rating - a.rating,
};

/**
 * Core combinatorial intersect filter over the master inventory.
 * A product is returned only when it satisfies every active criterion.
 * Empty / cleared filters are bypassed so the full catalog is shown.
 */
export function filterProducts(criteria = {}) {
  const { categories, minPrice, maxPrice, minRating } = criteria;

  const activeCategories =
    Array.isArray(categories) && categories.length > 0 ? categories : null;

  const hasMinPrice = minPrice != null && minPrice !== "";
  const hasMaxPrice = maxPrice != null && maxPrice !== "";
  const hasMinRating = minRating != null && minRating !== "";

  return products.filter((product) => {
    if (activeCategories && !activeCategories.includes(product.category)) {
      return false;
    }

    if (hasMinPrice && product.price < Number(minPrice)) {
      return false;
    }

    if (hasMaxPrice && product.price > Number(maxPrice)) {
      return false;
    }

    if (hasMinRating && product.rating < Number(minRating)) {
      return false;
    }

    return true;
  });
}

/**
 * Sort filtered results. Filtering always runs before sorting.
 */
export function sortProducts(items, sortBy) {
  if (!sortBy || !SORT_OPTIONS[sortBy]) {
    return items;
  }

  return [...items].sort(SORT_OPTIONS[sortBy]);
}

/**
 * Full pipeline: filter first, then sort for presentation order.
 */
export function getFilteredAndSortedProducts(criteria = {}) {
  const { sortBy, ...filterCriteria } = criteria;
  const filtered = filterProducts(filterCriteria);
  const sorted = sortProducts(filtered, sortBy);

  return {
    products: sorted,
    total: sorted.length,
    hasResults: sorted.length > 0,
  };
}

export function getFilterMetadata() {
  const prices = products.map((p) => p.price);

  return {
    categories: CATEGORIES,
    priceRange: {
      min: Math.min(...prices),
      max: Math.max(...prices),
    },
    ratingOptions: [1, 2, 3, 4, 5],
    sortOptions: [
      { value: "", label: "Default" },
      { value: "price-asc", label: "Price: Low to High" },
      { value: "price-desc", label: "Price: High to Low" },
      { value: "rating-desc", label: "Top Rated First" },
    ],
  };
}
