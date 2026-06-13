"""StockSense AI Service - FastAPI application for ML-powered stock analysis."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.api import predictions, patterns, chatbot, rebalance, voice, ipo, sentiment
from app.core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize ML models on startup."""
    logger.info("Loading ML models...")
    yield
    logger.info("Shutting down AI service...")


app = FastAPI(
    title="StockSense AI Service",
    description="AI/ML microservice for stock prediction, pattern detection, and NLP",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(predictions.router, prefix="/api/predict", tags=["Predictions"])
app.include_router(patterns.router, prefix="/api/patterns", tags=["Patterns"])
app.include_router(chatbot.router, prefix="/api/chat", tags=["Chatbot"])
app.include_router(rebalance.router, prefix="/api/rebalance", tags=["Rebalance"])
app.include_router(voice.router, prefix="/api/voice", tags=["Voice"])
app.include_router(ipo.router, prefix="/api/ipo", tags=["IPO"])
app.include_router(sentiment.router, prefix="/api/sentiment", tags=["Sentiment"])


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "stocksense-ai"}
