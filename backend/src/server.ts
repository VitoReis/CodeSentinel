import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { configure } from "./services/configure";

const app = express();
const port: number = 5000;
const router = require("./routes/routes");
const models = ["codellama", "llama3", "mistral"];

app.use(cors());
app.use(bodyParser.json());
app.use(router);

const startServer = async () => {
  try {
    const configurations = models.map(async (model): Promise<boolean> => {
      try {
        const response = await configure(model);
        if (!response) {
          console.log(`Unable to configurate ${model} model`);
        }
        return response;
      } catch (error) {
        console.log(`Unable to configurate ${model} model`, error);
        return false;
      }
    });

    await Promise.all(configurations);

    if (configurations) {
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
    } else {
      console.log("Unable to start server");
    }
  } catch (error) {
    console.log("Unable to start server", error);
  }
};

startServer();
