const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { Document, VectorStoreIndex } = require('llamaindex');

const BASE_URL = 'https://www.palmbayfl.gov/';
const visited = new Set();
const documents = [];

async function scrape(url) {
  if (visited.has(url) || !url.startsWith(BASE_URL)) return;
  visited.add(url);

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const text = $('body').text().replace(/\s+/g, ' ').trim();
    documents.push(new Document({ text, metadata: { url } }));

    const links = $('a[href]')
      .map((_, el) => new URL($(el).attr('href'), BASE_URL).toString())
      .get();

    for (const link of links) {
      await scrape(link);
    }
  } catch (e) {
    console.error('Failed:', url);
  }
}

(async () => {
  console.log('Scraping started...');
  await scrape(BASE_URL);
  console.log(`Scraped ${documents.length} pages`);

  const index = await VectorStoreIndex.fromDocuments(documents);
  fs.writeFileSync('./index.json', JSON.stringify(index.save()));
})();
