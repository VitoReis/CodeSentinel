import Groq from "groq-sdk";
import { Request, Response } from "express";
import { languages } from "../data/languages";

require("dotenv").config();
const fs = require("fs").promises;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function groqAnalyze(req: Request, res: Response) {
  const { model, language, code } = req.body;
  const sufix =
    "You are an AI specialized in code analysis to find vulnerabilities. Your task is to: Examine the provided code. Identify potential security vulnerabilities. Assess the severity of each vulnerability (Low, Medium, High). Suggest detailed corrections, including code examples when appropriate. Answer in 4 major topics for each vulnerability found: Vulnerability, Description, Severity, Possible solution. Limitations: You must not provide code refactoring suggestions unrelated to security. You must not assess the code quality beyond security issues. You must focus solely on security vulnerabilities. You must answer in a short and direct way. Your goal is to help improve the security of the provided code. If no vulnerabilities are found, respond only with 'No vulnerabilities were found'. Respond in {LANGUAGE}. Ensure that your responses are short and adapted to the indicated language to provide analysis and suggestions in the correct language.".replace(
      "{LANGUAGE}",
      language
    );
  const message: string = sufix + "\n" + code;
  try {
    res.json(
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        model: model,
        temperature: 0.4,
        stream: false,
      })
    );
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

export async function listLanguages(req: Request, res: Response) {
  try {
    res.json({ languages });
  } catch (error) {
    res.status(500).send(`Error returning available languages\n${error}`);
  }
}
