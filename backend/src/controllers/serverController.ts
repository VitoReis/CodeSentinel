import { Request, Response } from 'express';
import axios from 'axios';

const analise = async function (req: Request, res: Response) {
    const { code } = req.body;

    try {
        
        // Você é um verificador de vulnerabilidade em códigos, de uma resposta em tópicos, curta, direta, baseada nos embeddings fornecidos, e sempre em português do Brasil
        const result = await axios.post("http://localhost:11434/api/generate", {
            model: "mistral",
            prompt: code,
            stream: false
        });

        res.json({ response: result.data.response });
    } catch (error) {
        res.status(500).send(`Error processing code ${error}`);
    }
}

module.exports = {
    analise
};