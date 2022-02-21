import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";

createConnection()
  .then(() => {
    console.log("Database connected!");

    app.listen(process.env.PORT || 4000, () => {
      console.log(`App started!`);
    });
  })
  .catch((error) => console.log(error));
