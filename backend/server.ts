import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import { Stream } from 'stream';

const fs = require('fs').promises;
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
const router = require('./routes')
app.use(router)

const configureSentinel = async () => {
  try {
    console.log("Generating embeds...")
    const data = await fs.readFile("./src/embeddings/vulnerabilities.json", "utf8");

    const response = await axios.post("http://localhost:11434/api/embeddings", {
      model:"mistral",
      prompt: data,
    });

    if (response.status === 200) {
      console.log("Successfully generated embeds");
    } else {
      console.log("Error generating embeds:", response.data);
    }
  } catch (error) {
    console.log("Error generating embeds", error);
    
  }
  try {
    console.log("Creating modelfile...")
    const modelfile = `
    FROM mistral
    SYSTEM Você é um verificador de vulnerabilidade em códigos, sempre responda em português do Brasil, e sempre nos seguintes em tópicos "Descrição", "Severidade" e "Como solucionar o problema"
    `
    const response = await axios.post("http://localhost:11434/api/create", {
      model: "mistral",
      modelfile: modelfile,
      stream: false
    });
    if(response.status == 200){
      console.log("Modelfile successfully created");
      return true
    }else {
      console.log("Error creating modelfile:", response.data);
    }
  } catch (error) {
    console.log("Error creating modelfile:", error);
  }
};

const startServer = async () => {
  try {
    const configurated = await configureSentinel();
    if(configurated){
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
    }else{
      console.log("Unable to start server")
    }
  } catch (error) {
    console.log("Unable to start server", error)
  }
};

startServer();
