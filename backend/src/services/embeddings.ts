import pdfParse from "pdf-parse";
import { EmbeddingModel, FlagEmbedding } from "fastembed";
import faiss from "faiss-node";

const fs = require("fs").promises;
let faissIndex: faiss.IndexFlatL2 | null = null;
let storedEmbeddings: number[][] = [];

export async function extractAndEmbed(): Promise<number[][]> {
  const embeddingModel = await FlagEmbedding.init({
    model: EmbeddingModel.BGEBaseEN,
  });

  try {
    const pdfBuffer = await fs.readFile("./data/cwe_latest.pdf");
    const pdfData = await pdfParse(pdfBuffer);
    const embed = [pdfData.text];

    try {
      const embeddingsGenerator = embeddingModel.embed(embed, 2);
      const allEmbeddings: number[][] = [];

      for await (const batch of embeddingsGenerator) {
        allEmbeddings.push(...batch.map((vec) => Array.from(vec)));
      }

      return allEmbeddings;
    } catch (error) {
      console.error(`Error creating embeddings for chunk:`, error);
      return [];
    }
  } catch (error) {
    console.error("Error processing PDF file:", error);
    return [];
  }
}

export async function storeEmbeddings(embeddings: number[][]): Promise<void> {
  if (!embeddings || embeddings.length === 0) return;

  const dimension = embeddings[0].length;
  faissIndex = new faiss.IndexFlatL2(dimension);

  storedEmbeddings = embeddings;

  const vectors = embeddings.flat();
  faissIndex.add(vectors);
}

export async function retrieveEmbeddings(
  queryEmbedding: number[]
): Promise<number[][]> {
  if (!faissIndex) {
    throw new Error("FAISS index was not initialized.");
  }

  const ntotal = faissIndex.ntotal();
  if (ntotal === 0) {
    throw new Error("FAISS index is empty.");
  }

  const k = Math.min(5, ntotal);

  const result = faissIndex.search(queryEmbedding, k);

  return result.labels.map((idx) => storedEmbeddings[idx] ?? []);
}

export async function generateQueryEmbedding(query: string): Promise<number[]> {
  const embeddingModel = await FlagEmbedding.init({
    model: EmbeddingModel.BGEBaseEN,
  });

  const embeddingsGenerator = embeddingModel.embed([query], 2);
  const allEmbeddings: number[][] = [];

  for await (const batch of embeddingsGenerator) {
    allEmbeddings.push(...batch.map((vec) => Array.from(vec)));
  }

  return allEmbeddings[0] ?? [];
}
