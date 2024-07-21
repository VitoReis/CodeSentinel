import axios from "axios";

export async function sendCode(model: string, code: string): Promise<string> {
  const res = await axios.post("http://localhost:5000/api/send-code", {
    model,
    code,
  });

  const reply: string = res.data.reply;

  return reply;
}
