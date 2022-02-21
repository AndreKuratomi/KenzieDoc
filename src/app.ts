import express, { Request, Response } from "express";
import router from "./routes";
import { handleError } from "./middlewares/errors.middlewares";
import swaggerUiExpress from "swagger-ui-express";
import { swaggerDoc } from "./swagger";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDoc));

app.use(router);

app.use(handleError);

export default app;
