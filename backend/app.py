# backend/app.py

from fastapi import FastAPI
from pydantic import BaseModel
import chromadb
from sentence_transformers import SentenceTransformer
from openai import OpenAI

# ——————————————
# 1) Initialize once at top
# ——————————————

# Vector DB client
db_client    = chromadb.PersistentClient(path="./chroma_db")
collection   = db_client.get_or_create_collection("reguai_compliance")

# Embedding model
embedder     = SentenceTransformer("all-MiniLM-L6-v2")

# OpenAI client
ai_client    = OpenAI(api_key="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")

# FastAPI app
app = FastAPI()

class ChatRequest(BaseModel):
    query: str

# ——————————————
# 2) Chat endpoint
# ——————————————

@app.post("/chat")
async def chat(req: ChatRequest):
    # Retrieve
    q_emb = embedder.encode([req.query], convert_to_numpy=True)
    res   = collection.query(query_embeddings=q_emb, n_results=3)
    docs  = res["documents"][0]
    md    = res["metadatas"][0]

    # Build prompt
    context = "\n\n".join(
        f"## [{m['heading']}] (chunk {m['chunk_id']})\n{d}"
        for d, m in zip(docs, md)
    )
    prompt = f"""
You are a compliance assistant. Use ONLY the context below:

{context}

Q: {req.query}

A:
"""

    # Call OpenAI (use ai_client, not db_client!)
    resp = ai_client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are precise and concise."},
            {"role": "user",   "content": prompt},
        ],
        temperature=0,
    )
    answer  = resp.choices[0].message.content.strip()

    # Prepare sources
    sources = [
        {
          "heading": m["heading"],
          "snippet": d.strip()[:200] + ("…" if len(d) > 200 else "")
        }
        for d, m in zip(docs, md)
    ]

    return {"answer": answer, "sources": sources}
