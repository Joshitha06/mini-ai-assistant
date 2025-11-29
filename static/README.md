# Mini AI Assistant

A small ChatGPT-style web app (FastAPI backend + static frontend) built by Joshitha.

## Demo
<img width="1365" height="602" alt="Screenshot 2025-11-29 215538" src="https://github.com/user-attachments/assets/c9623260-de2a-440f-9a16-ab513d0a5801" />


## Features
- FastAPI backend with a `/chat` endpoint
- Simple ChatGPT-style frontend (HTML/CSS/JS)
- Uses Groq Llama model via API
- Easy to run locally and deploy

## Quick start
```bash
git clone https://github.com/Joshitha06/mini-ai-assistant.git
cd mini-ai-assistant
python -m venv venv
.\venv\Scripts\activate        # Windows
pip install -r requirements.txt
$env:GROQ_API_KEY="gsk_xxx"    # set your own key in PowerShell
python -m uvicorn main:app --reload
# open http://127.0.0.1:8000
