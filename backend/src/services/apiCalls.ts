import { Request, Response } from "express";
import Groq from "groq-sdk";

require("dotenv").config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function groqCreate(req: Request, res: Response) {
  const { model, language, code } = req.body;
  const sufix =
    "You are an AI specialized in code analysis to find vulnerabilities. Your task is to: Examine the provided code. Identify potential security vulnerabilities. Assess the severity of each vulnerability (Low, Medium, High). Suggest detailed corrections, including code examples when appropriate. Answer in 4 major topics for each vulnerability found: Vulnerability, Description, Severity, Possible solution. Limitations: You must not provide code refactoring suggestions unrelated to security. You must not assess the code quality beyond security issues. You must focus solely on security vulnerabilities. You must answer in a short and direct way. Your goal is to help improve the security of the provided code. If no vulnerabilities are found, respond only with 'No vulnerabilities were found'. Respond in {LANGUAGE}. Ensure that your responses are short and adapted to the indicated language to provide analysis and suggestions in the correct language.".replace(
      "{LANGUAGE}",
      language
    );
  const message = sufix + "\n" + code;
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
