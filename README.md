# ChatBot

This project builds a chatbot widget that answers questions based solely on content from [palmbayfl.gov](https://www.palmbayfl.gov).

## How it works

- **backend/**
  - `scraper.js`: Crawls all pages, extracts text, and builds a vector index using LlamaIndex.
  - `server.js`: Express API that retrieves context from the index and uses OpenAI to answer questions.
  - `index.json`: Saved vector index (regenerated after scraping).
  - `.env`: Stores your `OPENAI_API_KEY`.

- **frontend/**
  - `widget.js`: Embeddable chatbot widget.
  - `style.css`: Styling for the widget.
