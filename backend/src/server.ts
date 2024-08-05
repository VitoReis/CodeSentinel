import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port: number = 8000;
const router = require("./routes/routes");

app.use(cors());
app.use(bodyParser.json());
app.use(router);

const startServer = async () => {
  try {
    const server = app.listen(port, () => {
      console.log(
        `\nSERVER RUNNING ON: \x1b[34mhttp://localhost:${port}\x1b[0m\n`
      );
    });
  } catch (error) {
    console.log("\nUNABLE TO START SERVER\n", error);
  }
};

startServer();
