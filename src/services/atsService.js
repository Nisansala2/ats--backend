
const OpenAI = require('openai');
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const natural = require('natural'); // optional

async function extractKeywords(jobDescription) {
  // quick heuristic: split on punctuation, filter stopwords, pick most frequent nouns/words
  const words = jobDescription.toLowerCase().match(/\b[a-z0-9\+\#\-\.]+\b/g) || [];
  // implement frequency & filter etc.
  // For brevity, return top N manually:
  const freq = {};
  for (const w of words) freq[w] = (freq[w]||0)+1;
  const sorted = Object.keys(freq).sort((a,b) => freq[b]-freq[a]);
  return sorted.slice(0, 40);
}

async function keywordScore(cvText, keywords) {
  const lower = cvText.toLowerCase();
  let matches = 0;
  for (const k of keywords) if (lower.includes(k)) matches++;
  return (matches / keywords.length) * 50; // weight 50
}

async function semanticScore(cvText, jobDesc) {
  // embeddings
  const emb1 = await client.embeddings.create({ model: 'text-embedding-3-large', input: jobDesc });
  const emb2 = await client.embeddings.create({ model: 'text-embedding-3-large', input: cvText });
  function cos(a,b){
    let dot=0, na=0, nb=0;
    for (let i=0;i<a.length;i++){dot+=a[i]*b[i]; na+=a[i]*a[i]; nb+=b[i]*b[i];}
    return dot / (Math.sqrt(na)*Math.sqrt(nb)+1e-8);
  }
  const sim = cos(emb1.data[0].embedding, emb2.data[0].embedding);
  return sim * 50; // weight 50
}

async function computeATSScore(cvText, jobDesc) {
  const keywords = await extractKeywords(jobDesc);
  const kScore = await keywordScore(cvText, keywords);
  const sScore = await semanticScore(cvText, jobDesc);
  const final = Math.round(kScore + sScore); // out of 100
  return { final, kScore: Math.round(kScore), sScore: Math.round(sScore) };
}

module.exports = { computeATSScore };

