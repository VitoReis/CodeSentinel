import axios from "axios";

const configureSentinelModel = async (model: string) => {
  const fs = require("fs").promises;
  try {
    console.log(`Generating embeds for ${model}...`);
    const data = await fs.readFile("./src/embeddings/cwec_v4.14.xml", "utf8");

    const response = await axios.post("http://localhost:11434/api/embeddings", {
      model: model,
      prompt: data,
    });

    if (response.status === 200) {
      console.log(`Successfully generated embeds for ${model}`);
    } else {
      console.log(`Error generating embeds for ${model}:`, response.data);
    }
  } catch (error) {
    console.log(`Error generating embeds for ${model}`, error);
  }
  try {
    console.log(`Creating modelfile for ${model}...`);
    const modelfile = `
      FROM ${model}
      SYSTEM Você é um verificador de vulnerabilidade em códigos, sempre responda em português do Brasil. Responda nos seguintes tópicos 'Descrição', 'Severidade' e 'Como solucionar o problema'. Responda de forma simples, clara e direta. Caso receba um código sem vulnerabilidades apenas responda que não há vulnerabilidades no código. Caso receba qualquer outra entrada que não seja um código apenas responda que isso não se trata de um código.
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
    }
  } catch (error) {
    console.log(`Error creating modelfile for ${model}:`, error);
  }
};

module.exports = configureSentinelModel;
