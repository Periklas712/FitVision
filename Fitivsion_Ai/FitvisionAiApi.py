import logging
from pathlib import Path
from typing import List

from fastapi import FastAPI, HTTPException
from google.genai import errors

from LLM import ask_llm
from models import RequestObject, WorkoutPlan

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

PROMPT_TEMPLATE = (Path(__file__).parent / "promt_template2.txt").read_text(encoding="utf-8")

def create_prompt(level: str, equipment: str, goal: str) -> str:
    return PROMPT_TEMPLATE.format(level=level, equipment=equipment, goal=goal)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/CreateAndGetWorkoutPlans", response_model=List[WorkoutPlan])
def createAndGetWorkoutPlans(item: RequestObject):
    try:
        prompt = create_prompt(
            item.fitnessLevel.value,
            item.fitnessEquipment.value,
            item.fitnessGoal.value,
        )
        plans = ask_llm(prompt=prompt)
        logger.info("Generated %d workout plans", len(plans))
        return plans

    except errors.APIError as e:
        logger.error("Gemini API error (code=%s): %s", e.code, e.message)
        if e.code == 429:
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded. Please try again later.",
            )
        raise HTTPException(status_code=502, detail="AI service request failed.")

    except Exception:
        logger.exception("Unexpected error while generating workout plans")
        raise HTTPException(status_code=500, detail="Internal server error")
