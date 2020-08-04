const express = require("express");
const { secureCheckPointMiddleware } = require("./../middleware/auth");

const router = express.Router();

const UsersController = require("./../controllers/UsersController");
const CategoriesController = require("./../controllers/CategoriesController");
const ProductsController = require("./../controllers/ProductsController");

router.get("/", UsersController.Status);

router.post("/register", UsersController.Register);

router.post("/login", UsersController.Login);

router.get(
  "/categories",
  secureCheckPointMiddleware,
  CategoriesController.listAllCategories
);

router.get(
  "/products",
  secureCheckPointMiddleware,
  ProductsController.listAllProducts
);

router.get(
  "/productsbycat",
  secureCheckPointMiddleware,
  ProductsController.getAllProductsByCat
);

router.post(
  "/products/addtocart",
  secureCheckPointMiddleware,
  ProductsController.addToCart
);

router.post(
  "/products/getallcart",
  secureCheckPointMiddleware,
  ProductsController.getCartByUser
);

router.post(
  "/categories",
  secureCheckPointMiddleware,
  CategoriesController.createCategory
);

router.post(
  "/products",
  secureCheckPointMiddleware,
  ProductsController.createProduct
);

module.exports = router;
