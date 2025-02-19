import axios from "axios";
import { languages } from "../data/languages";
import { response } from "express";

let models: string[];

export async function create(
  model: string,
  baseModel: string
): Promise<boolean> {
  try {
    const response = await axios.post("http://localhost:11434/api/create", {
      model: model,
      from: baseModel,
      parameters: { temperature: 0.4 },
      system:
        "You are an AI specialized in code analysis to find vulnerabilities. Your task is to: Examine the provided code. Identify potential security vulnerabilities. Assess the severity of each vulnerability (Low, Medium, High). Suggest detailed corrections, including code examples when appropriate. Answer in 4 major topics for each vulnerability found: Vulnerability, Description, Severity, Possible solution. Limitations: You must not provide code refactoring suggestions unrelated to security. You must not assess the code quality beyond security issues. You must focus solely on security vulnerabilities. You must answer in a short and direct way. Your goal is to help improve the security of the provided code. If no vulnerabilities are found, respond only with 'No vulnerabilities were found'. Always respond in the language specified by the LANGUAGE tag at the beginning of the provided code. Ensure that your responses are short and adapted to the indicated language to provide analysis and suggestions in the correct language.",
      stream: false,
    });
    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteModel(model: string): Promise<boolean> {
  try {
    const response = await axios.post("http://localhost:11434/api/delete", {
      model: model,
    });
    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function running(): Promise<string[]> {
  try {
    const response = await axios.get("http://localhost:11434/api/tags");
    models = response.data.models.map(
      (model: { name: string }) => model.name.split(":")[0]
    );
    return models;
  } catch (error) {
    console.log(error);
    return models;
  }
}

export function addLanguage(language: string): boolean {
  try {
    languages.push(language);
    return true;
  } catch (error) {
    return false;
  }
}

export function deleteLanguage(language: string): boolean {
  try {
    languages.filter((element: string) => element !== language);
    return true;
  } catch (error) {
    return false;
  }
}
