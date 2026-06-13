"""News sentiment analysis endpoints."""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import random

router = APIRouter()


class SentimentRequest(BaseModel):
    texts: List[str]


@router.post("")
async def analyze_sentiment(request: SentimentRequest):
    """Analyze financial news sentiment using FinBERT-style classification."""
    results = []
    for text in request.texts:
        # Keyword-based sentiment (in production, use FinBERT model)
        text_lower = text.lower()
        positive_words = ["growth", "profit", "surge", "beat", "strong", "bullish", "upgrade", "record", "gain"]
        negative_words = ["loss", "decline", "crash", "miss", "weak", "bearish", "downgrade", "fall", "risk"]

        pos = sum(1 for w in positive_words if w in text_lower)
        neg = sum(1 for w in negative_words if w in text_lower)

        if pos > neg:
            sentiment, score = "positive", min(0.95, 0.6 + pos * 0.1)
        elif neg > pos:
            sentiment, score = "negative", min(0.95, 0.6 + neg * 0.1)
        else:
            sentiment, score = "neutral", 0.5

        results.append({"text": text[:200], "sentiment": sentiment, "confidence": round(score, 3)})

    return {"results": results, "model": "FinBERT-lite"}
