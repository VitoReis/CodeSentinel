import axios from "axios";

export async function groqAnalyze(
  model: string,
  code: string,
  language: string
): Promise<string> {
  const res = await axios.post("http://localhost:8000/api/analyze", {
    model,
    code,
    language,
  });

  return res.data.choices[0]?.message?.content;
}

export async function groqModels(): Promise<string[]> {
  const res = await axios.get("http://localhost:8000/api/models");
  const models = res.data.data.map((model: { id: string }) => model.id);

  return models;
}

export async function availableLanguages(): Promise<string[]> {
  const res = await axios.get("http://localhost:8000/api/languages");

  const languages: string[] = res.data.languages;

  return languages;
}
