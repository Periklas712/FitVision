import logging
import os
import time
from pathlib import Path
from typing import List

from google import genai
from google.genai import errors, types

from models import WorkoutPlan, WorkoutPlansResponse

logger = logging.getLogger(__name__)

api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY is not set")

MODEL = os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite")

client = genai.Client(api_key=api_key)

SYSTEM_PROMPT = (Path(__file__).parent / "system_prompt.txt").read_text(encoding="utf-8")

GENERATION_CONFIG = types.GenerateContentConfig(
    system_instruction=SYSTEM_PROMPT,
    response_mime_type="application/json",
    response_schema=WorkoutPlansResponse,
    temperature=0.7,
    max_output_tokens=4096,
)

def ask_llm(prompt: str, max_retries: int = 3, base_delay: float = 1.0) -> List[WorkoutPlan]:
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model=MODEL,
                contents=prompt,
                config=GENERATION_CONFIG,
            )

            parsed = response.parsed
            if parsed is None:
                raise ValueError("Model returned no parsable content")
            return parsed.plans

        except errors.APIError as e:
            is_last_attempt = attempt == max_retries - 1

            if e.code != 429 or is_last_attempt:
                logger.error("Gemini API error (code=%s): %s", e.code, e.message)
                raise

            delay = base_delay * (2 ** attempt)
            logger.warning(
                "Rate limited by Gemini. Retrying in %.1fs (attempt %d/%d)",
                delay, attempt + 1, max_retries,
            )
            time.sleep(delay)

    return []
