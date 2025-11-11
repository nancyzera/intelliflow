// Placeholder embedding generator.
// Replace with real embedding service (e.g., Gemini text-embedding or other provider).
export async function embedText(text) {
  // Simple deterministic pseudo-embedding for demo; use a real model in production.
  const size = 768;
  const vector = new Array(size).fill(0);
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
    vector[i % size] += (hash % 1000) / 1000;
  }
  const norm = Math.sqrt(vector.reduce((s, v) => s + v * v, 0)) || 1;
  return vector.map(v => v / norm);
}


