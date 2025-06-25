# 💬 ChatBot

An embeddable, AI-powered chatbot that answers questions **exclusively using content from a specific website**. ChatBot uses OpenAI and LlamaIndex to intelligently retrieve and summarize page content, helping users quickly find information through natural conversation.

---

## 🗺️ Project Overview

ChatBot is a full-stack solution with the following core components:

| Layer       | Tech Stack                     | Purpose                                                  |
|-------------|--------------------------------|----------------------------------------------------------|
| 🔌 Backend   | Node.js, Express, OpenAI, LlamaIndex | Handles chat requests, performs document retrieval and AI completion |
| 🧹 Scraper   | Axios, Cheerio, LlamaIndex     | Crawls the entire website, extracts text, builds vector index |
| 💬 Frontend  | HTML, JavaScript, CSS          | Embeddable widget that allows users to interact with the chatbot |


