import Groq from "groq-sdk";
import { Request, Response } from "express";
import { languages } from "../data/languages";
// import {
//   extractAndEmbed,
//   retrieveEmbeddings,
//   storeEmbeddings,
//   generateQueryEmbedding,
// } from "./embedding";

require("dotenv").config();
const fs = require("fs").promises;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
let modelfile: string = "";

export async function readModelfile(): Promise<void> {
  modelfile = await fs.readFile("./data/Modelfile", "utf8");
}

export async function groqAnalyze(req: Request, res: Response) {
  try {
    const {
      model = "llama-3.3-70b-versatile",
      language = "Português (Brasil)",
      code,
    } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code field is empty." });
    }

    // let context: number[][] = [];
    let message: string;

    // const embed = await extractAndEmbed();
    // if (embed.length > 0) {
    //   await storeEmbeddings(embed);
    //   const queryEmbedding = await generateQueryEmbedding(code);
    //   context = await retrieveEmbeddings(queryEmbedding);
    //   const truncatedContext = context.slice(0, 2);
    //   message = `CONTEXT:\n${truncatedContext}\nLANGUAGE:\n${language}\nCODE:\n${code}`;
    // } else {
    message = `LANGUAGE:\n${language}\nCODE:\n${code}`;
    // }

    const create = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: modelfile,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: model,
      temperature: 0.2,
      max_tokens: 1024,
      stream: false,
    });
    const reply = create.choices[0].message.content!.replace("{VULN}", "\n\n");
    res.status(200).json(reply);
  } catch (error) {
    res.status(500).send(`Error analyzing code\n${error}`);
  }
}

export async function groqModels(req: Request, res: Response) {
  try {
    const list = await groq.models.list();
    const models: string[] = list.data
      .map((model: { id: string }) => model.id)
      .filter(
        (id: string) =>
          ![
            "distil-whisper-large-v3-en",
            "whisper-large-v3",
            "whisper-large-v3-turbo",
          ].includes(id)
      );
    res.send(models);
  } catch (error) {
    res.status(500).send(`Error listing models\n${error}`);
  }
}

export async function listLanguages(req: Request, res: Response) {
  try {
    res.json({ languages });
  } catch (error) {
    res.status(500).send(`Error returning available languages\n${error}`);
  }
}
