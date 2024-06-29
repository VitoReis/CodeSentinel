import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port: number = 5000;
const router = require("./routes");
const configureSentinelModel = require("./src/controllers/modelController");

app.use(cors());
app.use(bodyParser.json());
app.use(router);

const startServer = async () => {
  try {
    const codellama = await configureSentinelModel("codellama");
    if (!codellama) {
      console.log("Unable to configurate codellama model");
    }

    const llama3 = await configureSentinelModel("llama3");
    if (!llama3) {
      console.log("Unable to configurate llama3 model");
    }

    const mistral = await configureSentinelModel("mistral");
    if (!mistral) {
      console.log("Unable to configurate mistral model");
    }

    if (codellama || llama3 || mistral) {
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
