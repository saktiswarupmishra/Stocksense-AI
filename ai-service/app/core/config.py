"""Application configuration."""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    APP_NAME: str = "StockSense AI Service"
    DEBUG: bool = True
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8080"]
    MONGODB_URI: str = "mongodb://localhost:27017/stocksense"
    REDIS_URL: str = "redis://localhost:6379"
    WEAVIATE_URL: str = "http://localhost:8090"
    MODEL_DIR: str = "./models"

    class Config:
        env_file = ".env"


settings = Settings()
