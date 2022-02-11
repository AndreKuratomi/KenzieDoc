import express from "express";
import router from "./routes";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const app = express();

app.use(express.json());

app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

app.use(router);

export default app;
