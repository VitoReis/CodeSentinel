import axios from "axios";

export async function groqCreate(
  model: string,
  code: string,
  language: string
): Promise<string> {
  const res = await axios.post("http://localhost:8000/api/groqCreate", {
    model,
    code,
    language,
  });

  return res.data.choices[0]?.message?.content;
}
