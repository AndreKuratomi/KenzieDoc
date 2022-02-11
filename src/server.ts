import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";
import { config } from "./database";

const PORT = 3000;

createConnection()
  .then(() => {
    console.log("Database connected!");

    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server starting on port ${process.env.PORT || PORT}`);
    });
  })
  .catch((error) => console.log(error));
