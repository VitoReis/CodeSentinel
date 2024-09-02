import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { running } from "./services/configure";
import { menu } from "./application/menu";

const app = express();
const port: number = 8000;
const router = require("./routes/routes");

app.use(cors());
app.use(bodyParser.json());
app.use(router);

let models: string[];

const startServer = async () => {
  try {
    models = await running();
    Promise.all(models);

    const modelsLength = models ? models.length : 0;

    const server = app.listen(port, () => {
      console.log(
        `\nMODELS RUNNING LOCALLY: \x1b[32m${modelsLength}\x1b[0m` +
          `\nSERVER RUNNING ON: \x1b[34mhttp://localhost:${port}\x1b[0m\n`
      );
    });
  } catch (error) {
    console.log("\nUNABLE TO START SERVER\n", error);
  }
};

async function presets() {
  if (!process.env.SKIP_MENU) {
    await menu();
  }
  startServer();
}

presets();
