from fastapi import FastAPI
from pydantic import BaseModel
import requests
import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

API_URL = "https://api.groq.com/openai/v1/chat/completions"
API_KEY = os.getenv("GROQ_API_KEY", "YOUR_GROQ_API_KEY_HERE")

class UserRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: UserRequest):
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    payload = {
        "model": "llama-3.1-8b-instant",
        "messages": [{"role": "user", "content": req.message}]
    }

    response = requests.post(API_URL, json=payload, headers=headers)

    try:
        data = response.json()
    except Exception:
        return {"reply": "Error: couldn't parse response from API."}

    reply = data.get("choices", [{}])[0].get("message", {}).get("content", "")
    if not reply:
        reply = data.get("error", {}).get("message", "No reply returned.")
    return {"reply": reply}

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def home():
    return FileResponse("static/index.html")




