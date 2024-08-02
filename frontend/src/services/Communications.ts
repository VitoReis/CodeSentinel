import axios from "axios";

export async function sendCode(
  model: string,
  code: string,
  language: string
): Promise<string> {
  const res = await axios.post("http://localhost:8000/api/send-code", {
    model,
    code,
    language,
  });

  const reply: string = res.data.reply;

  return reply;
}

export async function availableModels(): Promise<string[]> {
  const res = await axios.get("http://localhost:8000/api/availableModels");

  const models: string[] = res.data.models;

  return models;
}

export async function availableLanguages(): Promise<string[]> {
  const res = await axios.get("http://localhost:8000/api/availableLanguages");

  const languages: string[] = res.data.languages;

  return languages;
}
