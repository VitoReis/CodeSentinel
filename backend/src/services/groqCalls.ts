import Groq from "groq-sdk";
import { Request, Response } from "express";
import { languages } from "../data/languages";
import pdfParse from "pdf-parse";
import { EmbeddingModel, FlagEmbedding } from "fastembed";

require("dotenv").config();
const fs = require("fs").promises;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function groqAnalyze(req: Request, res: Response) {
  const { model, language, code } = req.body;
  const context = await groqEmbed();

  const modelfile: string = (
    await fs.readFile("./data/Modelfile", "utf8")
  ).replace("{MODEL}", model);

  const message: string =
    "CONTEXT: \n" +
    context +
    "\n" +
    modelfile +
    "\nLANGUAGE: " +
    language +
    "\nCODE:\n" +
    code;

  try {
    const create = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: model,
      temperature: 0.4,
      stream: false,
    });
    const reply = create.choices[0].message.content!.replace("{VULN}", "\n\n");
    res.json(reply);
  } catch (error) {
    res.status(500).send(`Error analyzing code\n${error}`);
  }
}

export async function groqModels(req: Request, res: Response) {
  try {
    const list = await groq.models.list();
    const models: string[] = list.data
      .map((model: { id: string }) => model.id)
      .filter((id: string) => id !== "whisper-large-v3");
    res.send(models);
  } catch (error) {
    res.status(500).send(`Error listing models\n${error}`);
  }
}

export async function groqEmbed() {
  const embeddingModel = await FlagEmbedding.init({
    model: EmbeddingModel.BGEBaseEN,
  });

  try {
    const pdfBuffer = await fs.readFile("./data/cwe_latest.pdf");
    const pdfData = await pdfParse(pdfBuffer);
    const embed = [pdfData.text];

    try {
      const embeddings = embeddingModel.embed(embed, 2);
      const allEmbeddings = [];

      for await (const batch of embeddings) {
        allEmbeddings.push(batch);
      }
      return allEmbeddings;
    } catch (error) {
      console.error(`Error creating embeddings for chunk:`, error);
      return undefined;
    }
  } catch (error) {
    console.error("Error processing PDF file:", error);
  }
}

export async function listLanguages(req: Request, res: Response) {
  try {
    res.json({ languages });
  } catch (error) {
    res.status(500).send(`Error returning available languages\n${error}`);
  }
}
