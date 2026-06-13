"""RAG-based chatbot endpoints."""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.models.rag_engine import RAGEngine

router = APIRouter()
rag = RAGEngine()


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


@router.post("")
async def chat(request: ChatRequest):
    """Process a chat message using RAG."""
    return rag.query(request.message, request.session_id)
