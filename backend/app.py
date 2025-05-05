# backend/app.py
from fastapi import FastAPI
from pydantic import BaseModel
import chromadb
from sentence_transformers import SentenceTransformer
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# **ADD** this block **before** your routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] for wide open
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize once
embedder  = SentenceTransformer("all-MiniLM-L6-v2")
client    = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection("reguai_compliance")
openai    = OpenAI(api_key="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")

app = FastAPI()

class ChatRequest(BaseModel):
    query: str

@app.post("/chat")
async def chat(req: ChatRequest):
    # 1) Embed query & retrieve
    q_emb = embedder.encode([req.query], convert_to_numpy=True)
    res   = collection.query(query_embeddings=q_emb, n_results=3)
    docs  = res["documents"][0]
    md    = res["metadatas"][0]
    
    # 2) Build prompt
    context = "\n\n".join(
      f"## [{m['heading']}] (chunk {m['chunk_id']})\n{d}"
      for d,m in zip(docs, md)
    )
    prompt = f"You are precise. Use ONLY the context below.\n\n{context}\n\nQ: {req.query}\nA:"
    
    # 3) Call OpenAI
    resp = openai.chat.completions.create(
      model="gpt-4",
      messages=[
        {"role":"system","content":"You are precise and concise."},
        {"role":"user","content":prompt}
      ],
      temperature=0
    )
    answer = resp.choices[0].message.content.strip()
    return {"answer": answer}
