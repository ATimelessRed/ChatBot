require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const fs = require('fs');
const { VectorStoreIndex } = require('llamaindex');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const indexData = JSON.parse(fs.readFileSync('./index.json', 'utf8'));
const index = VectorStoreIndex.load(indexData);

app.post('/chat', async (req, res) => {
  const question = req.body.message;
  const retriever = index.asRetriever();
  const documents = await retriever.retrieve(question);
  const context = documents.map(doc => doc.text).join('\n---\n');

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "Only answer using this website content. If you don't know the answer, say you don't know." },
      { role: "user", content: `${context}\n\nQ: ${question}` }
    ],
    model: "gpt-4",
    max_tokens: 300,
  });

  res.json({ reply: completion.choices[0].message.content });
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
