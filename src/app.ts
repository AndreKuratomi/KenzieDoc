import express from "express";
import router from "./routes";
import { handleError } from "./middlewares/errors.middlewares";

const app = express();

app.use(express.json());

app.use(router);

app.use(handleError);

export default app;
