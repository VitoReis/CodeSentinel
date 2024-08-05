import axios from "axios";
import { languages } from "../data/languages";

const fs = require("fs").promises;
let models: string[];

export async function create(
  model: string,
  baseModel: string
): Promise<boolean> {
  try {
    const modelfile: string = (
      await fs.readFile("./data/Modelfile", "utf8")
    ).replace("{MODEL}", baseModel);

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

export async function deleteModel(model: string): Promise<boolean> {
  try {
    const response = await axios.post("http://localhost:11434/api/delete", {
      name: model,
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

export async function embed(model: string, path: string): Promise<boolean> {
  try {
    const data = await fs.readFile(`./data/${path}`, "utf8");

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

export function addLanguage(language: string): boolean {
  try {
    languages.push(language);
    return true;
  } catch (error) {
    return false;
  }
}

export function deleteLanguage(language: string): boolean {
  try {
    languages.filter((element: string) => element !== language);
    return true;
  } catch (error) {
    return false;
  }
}
