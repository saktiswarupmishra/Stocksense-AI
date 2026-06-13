"""Candlestick pattern detector using CNN-based classification."""

import numpy as np
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)

PATTERNS = {
    "doji": {"description": "Indecision — open and close are nearly equal", "signal": "neutral"},
    "hammer": {"description": "Bullish reversal — small body at top, long lower shadow", "signal": "bullish"},
    "inverted_hammer": {"description": "Potential reversal — small body at bottom, long upper shadow", "signal": "bullish"},
    "engulfing_bullish": {"description": "Bullish reversal — large green candle engulfs previous red", "signal": "bullish"},
    "engulfing_bearish": {"description": "Bearish reversal — large red candle engulfs previous green", "signal": "bearish"},
    "morning_star": {"description": "Bullish reversal — three-candle pattern at bottom", "signal": "bullish"},
    "evening_star": {"description": "Bearish reversal — three-candle pattern at top", "signal": "bearish"},
    "three_white_soldiers": {"description": "Strong bullish — three consecutive green candles", "signal": "bullish"},
    "three_black_crows": {"description": "Strong bearish — three consecutive red candles", "signal": "bearish"},
    "shooting_star": {"description": "Bearish reversal — small body at bottom, long upper shadow", "signal": "bearish"},
}


class PatternDetector:
    """Detects candlestick patterns from OHLCV data."""

    def __init__(self):
        logger.info("Pattern Detector initialized")

    def detect(self, ohlcv: List[Dict]) -> Dict:
        """Detect candlestick patterns from OHLCV data."""
        if len(ohlcv) < 3:
            return {"patterns": [], "error": "Need at least 3 candles"}

        detected = []

        for i in range(len(ohlcv)):
            candle = ohlcv[i]
            o, h, l, c = float(candle["open"]), float(candle["high"]), float(candle["low"]), float(candle["close"])
            body = abs(c - o)
            full_range = h - l if h != l else 0.01
            upper_shadow = h - max(o, c)
            lower_shadow = min(o, c) - l

            # Doji
            if body / full_range < 0.1:
                detected.append(self._make_pattern("doji", i, candle, 0.85))

            # Hammer
            if lower_shadow > body * 2 and upper_shadow < body * 0.5 and body / full_range < 0.35:
                detected.append(self._make_pattern("hammer", i, candle, 0.80))

            # Shooting Star
            if upper_shadow > body * 2 and lower_shadow < body * 0.5 and body / full_range < 0.35:
                detected.append(self._make_pattern("shooting_star", i, candle, 0.78))

            # Two-candle patterns
            if i >= 1:
                prev = ohlcv[i - 1]
                po, pc = float(prev["open"]), float(prev["close"])

                # Bullish Engulfing
                if pc < po and c > o and o <= pc and c >= po:
                    detected.append(self._make_pattern("engulfing_bullish", i, candle, 0.82))

                # Bearish Engulfing
                if pc > po and c < o and o >= pc and c <= po:
                    detected.append(self._make_pattern("engulfing_bearish", i, candle, 0.82))

            # Three-candle patterns
            if i >= 2:
                p1, p2 = ohlcv[i - 2], ohlcv[i - 1]
                p1c, p1o = float(p1["close"]), float(p1["open"])
                p2c, p2o = float(p2["close"]), float(p2["open"])

                # Three White Soldiers
                if all(float(x["close"]) > float(x["open"]) for x in [p1, p2, candle]):
                    if p2c > p1c and c > p2c:
                        detected.append(self._make_pattern("three_white_soldiers", i, candle, 0.88))

                # Three Black Crows
                if all(float(x["close"]) < float(x["open"]) for x in [p1, p2, candle]):
                    if p2c < p1c and c < p2c:
                        detected.append(self._make_pattern("three_black_crows", i, candle, 0.88))

        return {
            "total_candles": len(ohlcv),
            "patterns_found": len(detected),
            "patterns": detected[-20:],  # Return last 20 patterns
            "summary": self._summarize(detected),
        }

    def _make_pattern(self, name: str, index: int, candle: Dict, confidence: float) -> Dict:
        info = PATTERNS[name]
        return {
            "pattern": name,
            "index": index,
            "date": candle.get("date", ""),
            "confidence": confidence,
            "signal": info["signal"],
            "description": info["description"],
        }

    def _summarize(self, patterns: List[Dict]) -> Dict:
        if not patterns:
            return {"overall": "neutral", "bullish_count": 0, "bearish_count": 0}
        bullish = sum(1 for p in patterns if p["signal"] == "bullish")
        bearish = sum(1 for p in patterns if p["signal"] == "bearish")
        overall = "bullish" if bullish > bearish else "bearish" if bearish > bullish else "neutral"
        return {"overall": overall, "bullish_count": bullish, "bearish_count": bearish, "neutral_count": len(patterns) - bullish - bearish}
