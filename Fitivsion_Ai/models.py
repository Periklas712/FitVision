from enum import Enum
from typing import List

from pydantic import BaseModel, Field

class FitnessLevel(str, Enum):
    BEGINNER = "BEGINNER"
    INTERMEDIATE = "INTERMEDIATE"
    ADVANCED = "ADVANCED"


class FitnessGoal(str, Enum):
    LOSE_WEIGHT = "LOSE_WEIGHT"
    GAIN_MUSCLE = "GAIN_MUSCLE"
    STAY_HEALTHY = "STAY_HEALTHY"
    INCREASE_ENDURANCE = "INCREASE_ENDURANCE"
    IMPROVE_MOBILITY = "IMPROVE_MOBILITY"
    REDUCE_STRESS = "REDUCE_STRESS"
    PREVENT_INJURIES = "PREVENT_INJURIES"
    INCREASE_ENERGY = "INCREASE_ENERGY"

class FitnessEquipment(str, Enum):
    NONE = "NONE"
    DUMBBELLS = "DUMBBELLS"
    KETTLEBELL = "KETTLEBELL"
    RESISTANCE_BANDS = "RESISTANCE_BANDS"
    PULL_UP_BAR = "PULL_UP_BAR"
    YOGA_MAT = "YOGA_MAT"
    BARBELL = "BARBELL"
    WEIGHT_PLATES = "WEIGHT_PLATES"
    TREADMILL = "TREADMILL"
    EXERCISE_BIKE = "EXERCISE_BIKE"

class RequestObject(BaseModel):
    fitnessLevel: FitnessLevel
    fitnessEquipment: FitnessEquipment
    fitnessGoal: FitnessGoal

class WorkoutPlan(BaseModel):
    title: str = Field(
        description="Short, specific plan name (3-6 words). No generic titles like 'Workout Plan'."
    )
    summary: str = Field(
        max_length=400,
        description="One or two plain-text sentences describing the plan's approach, for a preview card. No markdown.",
    )
    description: str = Field(
        description=(
            "Markdown, under 250 words, with exactly these three level-2 headings in this order: "
            "'## Weekly structure' (what is trained on which day, with example exercises, sets and rep ranges), "
            "'## Progression' (how to progress week to week), "
            "'## Warm-up and recovery'. Use '-' bullet lists under each heading."
        )
    )
    duration: int = Field(ge=1, le=52, description="Plan length in weeks")
    daysPerWeek: int = Field(ge=1, le=7, description="Training sessions per week")

class WorkoutPlansResponse(BaseModel):
    plans: List[WorkoutPlan]
