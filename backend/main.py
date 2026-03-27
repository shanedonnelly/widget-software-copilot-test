from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI(title="Content Scraper Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

RECEIVED_DATA_DIR = Path("./received_data")
RECEIVED_DATA_DIR.mkdir(exist_ok=True)


class PageContent(BaseModel):
    title: str
    content: str
    excerpt: str | None = None
    byline: str | None = None
    url: str
    timestamp: str
    source: str  # "widget" or "script"


@app.post("/api/content")
async def receive_content(data: PageContent):
    # Log preview
    preview = data.content[:300].replace("\n", " ")
    logger.info(f"[{data.source.upper()}] Received from {data.url}")
    logger.info(f"  Title: {data.title}")
    logger.info(f"  Preview: {preview}...")
    logger.info(f"  Length: {len(data.content)} chars")

    # Save to file
    ts = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
    filename = f"{data.source}_{ts}.md"
    filepath = RECEIVED_DATA_DIR / filename

    file_content = f"""## meta
title: "{data.title}"
url: {data.url}
source: {data.source}
timestamp: {data.timestamp}
received_at: {datetime.now().isoformat()}
excerpt: "{data.excerpt or ''}"
byline: "{data.byline or ''}"

## html actif

{data.content}
"""
    filepath.write_text(file_content, encoding="utf-8")
    logger.info(f"  Saved to: {filepath}")

    return {"status": "ok", "filename": filename}


@app.get("/api/health")
async def health():
    return {"status": "healthy"}
