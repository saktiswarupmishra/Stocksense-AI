"""Voice assistant endpoints (STT/TTS stubs)."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class TranscribeRequest(BaseModel):
    audio_base64: str = ""
    text: str = ""  # Fallback text input


class SynthesizeRequest(BaseModel):
    text: str


@router.post("/transcribe")
async def transcribe(request: TranscribeRequest):
    """Convert speech to text. Uses Web Speech API on frontend; this is the backend fallback."""
    return {"text": request.text or "Voice transcription would process audio here", "confidence": 0.95}


@router.post("/synthesize")
async def synthesize(request: SynthesizeRequest):
    """Convert text to speech. Returns audio config for frontend Web Speech API."""
    return {
        "text": request.text,
        "voice": "en-US",
        "rate": 1.0,
        "pitch": 1.0,
        "status": "ready",
    }
