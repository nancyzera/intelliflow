import { QdrantClient } from '@qdrant/js-client-rest';

let qdrant;
const VECTOR_SIZE = 768; // adjust if your embedding model returns a different size

export async function initQdrant() {
  qdrant = new QdrantClient({
    url: process.env.QDRANT_URL || 'http://localhost:6333',
    apiKey: process.env.QDRANT_API_KEY || undefined
  });

  const collection = process.env.QDRANT_COLLECTION || 'intelliflow_vectors';
  const collections = await qdrant.getCollections();
  const exists = collections.collections.some(c => c.name === collection);
  if (!exists) {
    await qdrant.createCollection(collection, {
      vectors: {
        size: VECTOR_SIZE,
        distance: 'Cosine'
      }
    });
  }
}

export function getQdrant() {
  if (!qdrant) throw new Error('Qdrant client not initialized');
  return qdrant;
}

export function getVectorSize() {
  return VECTOR_SIZE;
}


