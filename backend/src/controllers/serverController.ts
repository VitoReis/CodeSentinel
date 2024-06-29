import { Request, Response } from "express";
import axios from "axios";

export async function analise(req: Request, res: Response) {
  const { model, code } = req.body;

  try {
    const result = await axios.post("http://localhost:11434/api/generate", {
      model: model,
      prompt: code,
      stream: false,
    });

    res.json({ response: result.data.response });
  } catch (error) {
    res.status(500).send(`Error processing code ${error}`);
  }
}
