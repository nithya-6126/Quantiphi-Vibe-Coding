import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
});

function unwrap(response) {
  if (!response.data?.success) {
    throw new Error(response.data?.message || "Request failed");
  }

  return response.data;
}

export async function fetchProductMetadata() {
  const response = await client.get("/products/metadata");
  return unwrap(response).data;
}

export async function fetchProducts(filters) {
  const params = {};

  if (filters.categories.length) params.categories = filters.categories.join(",");
  if (filters.minPrice !== "") params.minPrice = filters.minPrice;
  if (filters.maxPrice !== "") params.maxPrice = filters.maxPrice;
  if (filters.minRating !== "") params.minRating = filters.minRating;
  if (filters.sortBy) params.sortBy = filters.sortBy;

  const response = await client.get("/products", { params });
  const data = unwrap(response);

  return { products: data.data, total: data.meta.total };
}
