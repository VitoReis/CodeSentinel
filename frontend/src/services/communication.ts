import axios from "axios";

export async function sendCode(model: string, code: string) {
  const res = await axios.post("http://localhost:5000/api/send-code", {
    model,
    code,
  });

  return res;
}
