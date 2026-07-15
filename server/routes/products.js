import { Router } from "express";
import {
  getProducts,
  filterProductsPost,
  getMetadata,
} from "../controllers/productController.js";

const router = Router();

router.get("/metadata", getMetadata);
router.get("/", getProducts);
router.post("/filter", filterProductsPost);

export default router;
