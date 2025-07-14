import { Router } from "express";
import { loadCredentialsMiddleware } from "@middlewares";

import { AuthenticationController } from "@features/auth";
import { ProductController } from "@features/product";

const routes = Router();

// Log de todas las requests
routes.use((req, res, next) => {
  console.log("Request recibida:", req.method, req.url, req.headers.authorization);
  next();
});

routes.get("/auth/install", AuthenticationController.install);
routes.post(
  "/products",
  loadCredentialsMiddleware,
  ProductController.create
);

routes.get(
  "/products/total",
  loadCredentialsMiddleware,
  ProductController.getTotal
);
routes.get(
  "/products",
  loadCredentialsMiddleware,
  ProductController.getAll
);
routes.delete(
  "/products/:id",
  loadCredentialsMiddleware,
  ProductController.delete
);

export default routes;
