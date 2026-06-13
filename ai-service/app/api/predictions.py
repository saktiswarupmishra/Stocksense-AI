"""Stock price prediction endpoints."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.models.lstm_predictor import LSTMPredictor
from app.models.transformer_predictor import TransformerPredictor

router = APIRouter()
lstm = LSTMPredictor()
transformer = TransformerPredictor()


class PredictionRequest(BaseModel):
    prices: List[float]
    days: int = 30
    model: str = "both"  # "lstm", "transformer", or "both"


@router.post("/{symbol}")
async def predict_stock(symbol: str, request: PredictionRequest):
    """Predict stock prices using LSTM and/or Transformer models."""
    if len(request.prices) < 10:
        raise HTTPException(status_code=400, detail="Need at least 10 price data points")

    results = {"symbol": symbol.upper(), "prediction_days": request.days}

    if request.model in ("lstm", "both"):
        results["lstm"] = lstm.predict(request.prices, request.days)

    if request.model in ("transformer", "both"):
        results["transformer"] = transformer.predict(request.prices, request.days)

    return results
