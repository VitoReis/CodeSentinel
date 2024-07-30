import axios from "axios";
import { Request, Response } from "express";
import { languages } from "../data/availables";

export async function availableModels(req: Request, res: Response) {
  try {
    const response = await axios.get("http://localhost:11434/api/tags");
    const models = response.data.models.map(
      (model: { name: string }) => model.name.split(":")[0]
    );
    res.json({ models });
  } catch (error) {
    res.status(500).send(`Error returning available models\n${error}`);
  }
}

export async function availableLanguages(req: Request, res: Response) {
  try {
    res.json({ languages });
  } catch (error) {
    res.status(500).send(`Error returning available languages\n${error}`);
  }
}

export async function analyze(req: Request, res: Response): Promise<void> {
  const { model, code, language } = req.body;

  try {
    const result = await axios.post("http://localhost:11434/api/generate", {
      model: model,
      prompt: `LANGUAGE: ${language}\n` + code,
      stream: false,
    });
    res.json({ reply: result.data.response });
  } catch (error) {
    res.status(500).send(`Error processing code ${error}`);
  }
}