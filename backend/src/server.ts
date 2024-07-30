import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { embed, running } from "./services/configure";

interface EmbeddingResult {
  result: boolean;
  missing: number;
}

const app = express();
const port: number = 5000;
const router = require("./routes/routes");

app.use(cors());
app.use(bodyParser.json());
app.use(router);

let models: string[];

async function embeddingModels(): Promise<EmbeddingResult> {
  // LOADING
  const LOAD = `\x1b[34m` + `O` + `\x1b[0m`;
  const DONE = `\x1b[32m` + `✓` + `\x1b[0m`;
  const ERROR = `\x1b[31m` + `X` + `\x1b[0m`;
  let loading =
    `\n\n\n\n****************************` +
    `\n\tSTATUS` +
    `\n****************************` +
    `\n\tMODEL\tEMBEDDINGS` +
    `\n****************************` +
    `${models
      .map((model) => {
        return `\n${model} - ${LOAD}`;
      })
      .join("")}` +
    `\n****************************` +
    `\nLOAD ${LOAD}    DONE ${DONE}    ERROR ${ERROR}` +
    `\n****************************`;
  let missing = 0;
  const loadingLoop = setInterval(() => {
    console.log(loading);
  }, 2000);

  // EMBEDS
  const setEmbed = models.map(async (model): Promise<boolean> => {
    try {
      const status: boolean = await embed(model);
      if (!status) {
        loading = loading.replace(
          `\n${model} - ${LOAD}`,
          `\n${model} - ${ERROR}`
        );
        missing++;
        return false;
      } else {
        loading = loading.replace(
          `\n${model} - ${LOAD}`,
          `\n${model} - ${DONE}`
        );
        return true;
      }
    } catch (error) {
      loading = loading.replace(
        `\n${model} - ${LOAD}`,
        `\n${model} - ${ERROR}`
      );
      return false;
    }
  });

  await Promise.all(setEmbed).then(() => clearInterval(loadingLoop));
  console.log(loading);

  return { result: setEmbed.every(Boolean), missing: missing };
}

const startServer = async () => {
  try {
    models = await running();
    Promise.all(models);
    if (models.length <= 0) throw new Error("THERE ARE NO MODELS AVAILABLE\n");
    const embeds = await embeddingModels();
    if (embeds.result) {
      app.listen(port, () => {
        console.log(
          `\nMODELS RUNNING: \x1b[32m${models.length}\x1b[0m\n` +
            `MODELS MISSING EMBEDDINS: \x1b[31m${embeds.missing}\x1b[0m\n` +
            `SERVER RUNNING ON: \x1b[34mhttp://localhost:${port}\x1b[0m\n`
        );
      });
    }
  } catch (error) {
    console.log("UNABLE TO START SERVER\n", error);
  }
};
startServer();
