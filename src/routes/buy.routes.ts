import { Router } from "express";
import { FinishShoppingController } from "../controllers/buys/finishShopping.controller";
import { BuyByIdController } from "../controllers/buys/buyById.controller";
import { ListBuysController } from "../controllers/buys/listBuys.controller";
import { whoAmI } from "../middlewares/whoAmI.middleware";
import { validateToken } from "../middlewares/validateToken.middleware";

const buyRouter = Router();

const finishShoppingController = new FinishShoppingController();
const buyByIdController = new BuyByIdController();
const listBuysController = new ListBuysController();

buyRouter.post("", validateToken, whoAmI, finishShoppingController.handle);
buyRouter.get("/:userId", validateToken, whoAmI, buyByIdController.handle);
buyRouter.get("", validateToken, whoAmI, listBuysController.handle);

export default buyRouter;
