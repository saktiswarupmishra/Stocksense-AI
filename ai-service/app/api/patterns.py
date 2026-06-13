"""Candlestick pattern detection endpoints."""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict
from app.models.pattern_detector import PatternDetector

router = APIRouter()
detector = PatternDetector()


class PatternRequest(BaseModel):
    ohlcv: List[Dict]


@router.post("/detect")
async def detect_patterns(request: PatternRequest):
    """Detect candlestick patterns from OHLCV data."""
    return detector.detect(request.ohlcv)
