"""IPO recommendation scoring endpoints."""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import random

router = APIRouter()


class IPOScoreRequest(BaseModel):
    company_name: str
    sector: str
    price_range_low: float
    price_range_high: float
    revenue: float = 0
    profit_margin: float = 0
    market_size: float = 0


@router.post("/score")
async def score_ipo(request: IPOScoreRequest):
    """Generate AI-based IPO recommendation score."""
    random.seed(hash(request.company_name))

    # Multi-factor scoring
    valuation_score = min(10, max(1, 10 - (request.price_range_high / max(request.revenue, 1)) * 2)) if request.revenue > 0 else 5
    sector_scores = {"Technology": 8, "Healthcare": 7, "Financial": 6, "Consumer": 6, "Energy": 5}
    sector_score = sector_scores.get(request.sector, 5)
    market_score = min(10, request.market_size / 10) if request.market_size > 0 else 5
    profitability_score = min(10, max(1, request.profit_margin * 20 + 5)) if request.profit_margin != 0 else 4

    overall = (valuation_score * 0.3 + sector_score * 0.25 + market_score * 0.25 + profitability_score * 0.2)

    recommendation = "Strong Buy" if overall >= 7.5 else "Buy" if overall >= 6 else "Hold" if overall >= 4.5 else "Avoid"

    return {
        "company": request.company_name,
        "overall_score": round(overall, 1),
        "recommendation": recommendation,
        "factors": {
            "valuation": round(valuation_score, 1),
            "sector_outlook": round(sector_score, 1),
            "market_opportunity": round(market_score, 1),
            "profitability": round(profitability_score, 1),
        },
        "risk_factors": [
            "Market volatility may impact listing gains",
            "Sector competition could affect long-term growth",
        ],
    }
