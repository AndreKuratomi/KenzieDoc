import { Router } from "express";
import { RegisterProductController } from "../controllers/product/registerProduct.controller";
import { ListProductsController } from "../controllers/product/listProducts.controller";
import { ProductByIdController } from "../controllers/product/productById.controller";
import { whoAmI } from "../middlewares/whoAmI.middleware";
import { validateToken } from "../middlewares/validateToken.middleware";

const productRouter = Router();

const registerProductController = new RegisterProductController();
const listProductsController = new ListProductsController();
const productByIdController = new ProductByIdController();

productRouter.post("", validateToken, whoAmI, registerProductController.handle);
productRouter.get("", listProductsController.handle);
productRouter.get("/:id", productByIdController.handle);

export default productRouter;
