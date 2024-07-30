import axios from "axios";

const fs = require("fs").promises;
let models: string[];

export async function create(model: string): Promise<boolean> {
  try {
    const modelfile: string = (
      await fs.readFile("./data/Modelfile", "utf8")
    ).replace("{MODEL}", model);

    const response = await axios.post("http://localhost:11434/api/create", {
      model: model,
      modelfile: modelfile,
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

function extractText(node: Node): string {
  let texts: string[] = [];

  function traverse(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      texts.push(node.nodeValue?.trim() || "");
    }
    for (let i = 0; i < node.childNodes.length; i++) {
      traverse(node.childNodes[i]);
    }
  }

  traverse(node);
  return texts.join(" ").replace(/\s+/g, " ").trim();
}

export async function embed(model: string): Promise<boolean> {
  try {
    const data = await fs.readFile("./data/cwec_v4.15.txt", "utf8");

    const response = await axios.post("http://localhost:11434/api/embeddings", {
      model: model,
      prompt: data,
    });

    if (response.status === 200) {
      return true;
    } else {
      console.log(response.data);
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
