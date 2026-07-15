import {
  getFilteredAndSortedProducts,
  getFilterMetadata,
} from "../services/productService.js";

function parseCategories(value) {
  if (value == null || value === "") {
    return [];
  }

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return String(value)
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
}

function parseOptionalNumber(value) {
  if (value == null || value === "") {
    return null;
  }

  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function buildCriteria(source) {
  return {
    categories: parseCategories(source.categories),
    minPrice: parseOptionalNumber(source.minPrice),
    maxPrice: parseOptionalNumber(source.maxPrice),
    minRating: parseOptionalNumber(source.minRating),
    sortBy: source.sortBy || "",
  };
}

export function getProducts(req, res) {
  try {
    const criteria = buildCriteria(req.query);
    const result = getFilteredAndSortedProducts(criteria);

    res.json({
      success: true,
      data: result.products,
      meta: {
        total: result.total,
        hasResults: result.hasResults,
        appliedFilters: {
          categories: criteria.categories,
          minPrice: criteria.minPrice,
          maxPrice: criteria.maxPrice,
          minRating: criteria.minRating,
          sortBy: criteria.sortBy || null,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
}

export function filterProductsPost(req, res) {
  try {
    const criteria = buildCriteria(req.body ?? {});
    const result = getFilteredAndSortedProducts(criteria);

    res.json({
      success: true,
      data: result.products,
      meta: {
        total: result.total,
        hasResults: result.hasResults,
        appliedFilters: {
          categories: criteria.categories,
          minPrice: criteria.minPrice,
          maxPrice: criteria.maxPrice,
          minRating: criteria.minRating,
          sortBy: criteria.sortBy || null,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to filter products",
      error: error.message,
    });
  }
}

export function getMetadata(req, res) {
  try {
    res.json({
      success: true,
      data: getFilterMetadata(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch filter metadata",
      error: error.message,
    });
  }
}
