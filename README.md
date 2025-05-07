# ReguAI

ReguAI-App is a React + Vite App and is the frontend. It is nested within the ReguAI repo with other files outside containing backend references.

The ReguAI MVP includes both frontend and backend components. The backend implements Retrieval-Augmented Generation (RAG) to accurately answer user queries related to compliance.

We chose RAG over model fine-tuning for the MVP, as it offers greater immediate benefits by leveraging an updatable knowledge base. While fine-tuning remains a potential future enhancement, we believe it would provide marginal gains compared to the flexibility and accuracy enabled by retrieval.

For this prototype, we compiled a set of compliance documents, embedded them using a sentence-transformer model, and stored them in a vector database. At runtime, the backend encodes the user’s query and retrieves the most relevant documents based on vector similarity. These documents are then used as context for the language model to generate precise, source-backed answers to compliance-related questions.

## 📁 Project Structure

```
ReguAI-App/
├── public/                # Static assets
├── src/                  # React source code
│   ├── components/
|   |  ├── ChatbotIcon.jsx # Chatbot icon
|   |  ├── ChatForm.jsx # Handling user message submission
|   |  ├── ChatMessage.jsx # Chat message template
│   ├── App.jsx # Main page that user lands on
│   ├── index.css # Styling
│   ├── main.jsx # Renders App
├── index.html            # Main HTML template
├── package.json          # Project metadata and dependencies
├── vite.config.js        # Vite configuration
└── .gitignore
```

## 🚀 How to run:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ReguAI.git
cd ReguAI
cd ReguAI-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Run Backend

At the root of the directory, when you ls it should look like:

```bash
BE_test.ipynb           backend                 preprocessed_chunks.csv
README.md               chroma_db               requirements.txt
ReguAI-App              embeddings_rag.ipynb    sample.txt
```
RUN:
```bash
python -m uvicorn backend.app:app --reload
```

This will start the app at `http://localhost:5173` (or a different port if 5173 is in use).

## 🛠 Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- JavaScript
- CSS
