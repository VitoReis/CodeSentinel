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

async function showMenu(server: any) {
  const close: boolean = await menu();
  if (close) {
    server.close();
  }
}

const startServer = async () => {
  try {
    models = await running();
    Promise.all(models);

    const server = app.listen(port, () => {
      console.log(
        `\nMODELS RUNNING: \x1b[32m${models.length}\x1b[0m` +
          `\nSERVER RUNNING ON: \x1b[34mhttp://localhost:${port}\x1b[0m\n`
      );
      // showMenu(server);
    });
  } catch (error) {
    console.log("\nUNABLE TO START SERVER\n", error);
  }
};

startServer();
