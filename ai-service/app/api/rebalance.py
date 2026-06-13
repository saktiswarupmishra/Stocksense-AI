"""AI portfolio rebalancing endpoints."""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict
import numpy as np

router = APIRouter()


class RebalanceRequest(BaseModel):
    holdings: List[Dict]  # [{"symbol": "AAPL", "allocation": 30, "current_value": 5000}]
    risk_profile: str = "moderate"  # conservative, moderate, aggressive
    target_return: float = 10.0


# Target allocations based on risk profile
TARGET_ALLOCATIONS = {
    "conservative": {"stocks": 40, "bonds": 40, "cash": 15, "alternatives": 5},
    "moderate": {"stocks": 60, "bonds": 25, "cash": 10, "alternatives": 5},
    "aggressive": {"stocks": 80, "bonds": 10, "cash": 5, "alternatives": 5},
}

SECTOR_TARGETS = {
    "Technology": 25, "Healthcare": 15, "Financial": 15,
    "Consumer": 15, "Industrial": 10, "Energy": 10, "Other": 10,
}


@router.post("")
async def rebalance_portfolio(request: RebalanceRequest):
    """Generate AI-powered portfolio rebalancing suggestions."""
    target = TARGET_ALLOCATIONS.get(request.risk_profile, TARGET_ALLOCATIONS["moderate"])
    total_value = sum(h.get("current_value", 0) for h in request.holdings)

    if total_value == 0:
        return {"error": "Portfolio has no value to rebalance"}

    suggestions = []
    for holding in request.holdings:
        current_alloc = (holding.get("current_value", 0) / total_value) * 100
        # Simplified: suggest target of equal weight adjusted by risk
        target_alloc = 100.0 / max(len(request.holdings), 1)
        diff = target_alloc - current_alloc

        action = "hold"
        if diff > 3:
            action = "buy"
        elif diff < -3:
            action = "sell"

        suggestions.append({
            "symbol": holding["symbol"],
            "current_allocation": round(current_alloc, 2),
            "target_allocation": round(target_alloc, 2),
            "difference": round(diff, 2),
            "action": action,
            "amount_usd": round(abs(diff / 100) * total_value, 2),
        })

    # Calculate portfolio metrics
    risk_score = {"conservative": 3, "moderate": 5, "aggressive": 8}.get(request.risk_profile, 5)

    return {
        "risk_profile": request.risk_profile,
        "total_value": round(total_value, 2),
        "target_allocation": target,
        "suggestions": suggestions,
        "portfolio_metrics": {
            "risk_score": risk_score,
            "diversification_score": min(10, len(request.holdings) * 1.5),
            "rebalance_urgency": "high" if any(abs(s["difference"]) > 10 for s in suggestions) else "low",
        },
    }
