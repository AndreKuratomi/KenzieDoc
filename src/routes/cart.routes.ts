import { Router } from "express";
import { ListCartsController } from "../controllers/cart/listCarts.controller";
import { AddToCartController } from "../controllers/cart/addToCart.controller";
import { GetCartController } from "../controllers/cart/getCart.controller";
import { DeleteFromCartController } from "../controllers/cart/deleteFromCart.controller";
import { whoAmI } from "../middlewares/whoAmI.middleware";
import { validateToken } from "../middlewares/validateToken.middleware";

const cartRouter = Router();

const listCartsController = new ListCartsController();
const addToCartController = new AddToCartController();
const getCartController = new GetCartController();
const deleteFromCartController = new DeleteFromCartController();

cartRouter.post("", validateToken, whoAmI, addToCartController.handle);
cartRouter.get("/:userId", validateToken, whoAmI, getCartController.handle);
cartRouter.get("", validateToken, whoAmI, listCartsController.handle);
cartRouter.delete(
  "/:productId",
  validateToken,
  whoAmI,
  deleteFromCartController.handle
);

export default cartRouter;
