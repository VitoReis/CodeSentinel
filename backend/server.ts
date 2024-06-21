import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/send-code', async (req, res) => {
  const { code } = req.body;
  const prompt: string = "Liste em topicos as vulnerabilidades do código a seguir, caso não haja apenas diga que não há, responda em portugues do brasil:" + code

  try {
    let fullResponse : string = "";
    let done: boolean = false;
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: "mistral", 
      prompt: prompt
    });

    const resultLines = response.data.trim().split('\n');;
    resultLines.forEach((line: string) => {
      const part = JSON.parse(line);
      fullResponse += part.response;
      done = part.done;
    });

    res.json({ response: fullResponse });
  } catch (error) {
    res.status(500).send('Erro ao processar o código');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
