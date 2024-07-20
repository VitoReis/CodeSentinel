import axios from "axios";

export async function configure(model: string) {
  const fs = require("fs").promises;
  try {
    console.log(`Generating embeds for ${model}...`);
    const data = await fs.readFile("./data/cwec_v4.14.xml", "utf8");

    const response = await axios.post("http://localhost:11434/api/embeddings", {
      model: model,
      prompt: data,
    });

    if (response.status === 200) {
      console.log(`Successfully generated embeds for ${model}`);
    } else {
      console.log(`Error generating embeds for ${model}:`, response.data);
      return false;
    }
  } catch (error) {
    console.log(`Error generating embeds for ${model}`, error);
    return false;
  }
  try {
    console.log(`Creating modelfile for ${model}...`);
    const modelfile = `
      FROM ${model}
      SYSTEM Você é um verificador de vulnerabilidade em códigos, sempre responda em português do Brasil. Responda nos seguintes tópicos Descrição, Severidade e Como solucionar o problema. Responda de forma simples, clara, direta e resumida. Caso receba um código sem vulnerabilidades apenas responda que não há vulnerabilidades no código. Caso receba algo que não seja um código apenas responda que não se trata de um código.
      PARAMETER temperature 0.4
      `;
    const response = await axios.post("http://localhost:11434/api/create", {
      model: model,
      modelfile: modelfile,
      stream: false,
    });
    if (response.status == 200) {
      console.log(`Modelfile successfully created for ${model}`);
      return true;
    } else {
      console.log(`Error creating modelfile for ${model}:`, response.data);
      return false;
    }
  } catch (error) {
    console.log(`Error creating modelfile for ${model}:`, error);
    return false;
  }
}
