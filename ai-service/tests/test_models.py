"""Tests for AI service prediction models."""

import pytest
from app.models.lstm_predictor import LSTMPredictor
from app.models.transformer_predictor import TransformerPredictor
from app.models.pattern_detector import PatternDetector
from app.models.rag_engine import RAGEngine


class TestLSTMPredictor:
    def setup_method(self):
        self.predictor = LSTMPredictor()
        self.prices = [100 + i * 0.5 + (i % 5) * 0.3 for i in range(90)]

    def test_predict_returns_correct_structure(self):
        result = self.predictor.predict(self.prices, days=10)
        assert "predictions" in result
        assert len(result["predictions"]) == 10
        assert "confidence_upper" in result
        assert "confidence_lower" in result
        assert result["model"] == "LSTM"

    def test_predict_insufficient_data(self):
        result = self.predictor.predict([100, 101], days=5)
        assert "error" in result

    def test_confidence_intervals_widen(self):
        result = self.predictor.predict(self.prices, days=30)
        spreads = [result["confidence_upper"][i] - result["confidence_lower"][i] for i in range(30)]
        assert spreads[-1] > spreads[0]  # Uncertainty grows


class TestTransformerPredictor:
    def setup_method(self):
        self.predictor = TransformerPredictor()
        self.prices = [150 + i * 0.3 for i in range(90)]

    def test_predict_returns_correct_structure(self):
        result = self.predictor.predict(self.prices, days=15)
        assert "predictions" in result
        assert len(result["predictions"]) == 15
        assert result["model"] == "Transformer"
        assert "attention_weights" in result


class TestPatternDetector:
    def setup_method(self):
        self.detector = PatternDetector()

    def test_detect_doji(self):
        ohlcv = [
            {"open": 100, "high": 105, "low": 95, "close": 100.1, "date": "2024-01-01"},
            {"open": 101, "high": 106, "low": 96, "close": 101.05, "date": "2024-01-02"},
            {"open": 102, "high": 107, "low": 97, "close": 102.0, "date": "2024-01-03"},
        ]
        result = self.detector.detect(ohlcv)
        assert result["total_candles"] == 3
        assert isinstance(result["patterns"], list)


class TestRAGEngine:
    def setup_method(self):
        self.rag = RAGEngine()

    def test_query_pe_ratio(self):
        result = self.rag.query("What is P/E ratio?")
        assert "response" in result
        assert len(result["response"]) > 0
        assert "P/E" in result["response"] or "ratio" in result["response"].lower()

    def test_query_unknown_topic(self):
        result = self.rag.query("xyzabc123")
        assert "response" in result
        assert len(result["response"]) > 0
