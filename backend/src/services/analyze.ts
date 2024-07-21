import axios from "axios";
import { Request, Response } from "express";

export async function analyze(req: Request, res: Response): Promise<void> {
  const { model, code } = req.body;

  try {
    const result = await axios.post("http://localhost:11434/api/generate", {
      model: model,
      prompt: code,
      stream: false,
    });

    res.json({ reply: result.data.response });
  } catch (error) {
    res.status(500).send(`Error processing code ${error}`);
  }
}
