from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from LLM import ask_llm
from google.api_core.exceptions import ResourceExhausted


app = FastAPI()

workout_cache={}



class RequestObject(BaseModel):
    fitnessLevel: str 
    fitnessEquipment: str 
    fitnessGoal: str

class WorkoutPlan(BaseModel):
    title: str
    description: str
    duration: int 
    daysPerWeek: int

def load_promt(filename="promt_template2.txt"):
    with open(filename,"r",encoding="utf-8") as f:
        return f.read()

def create_promt(level,equipment,goal):
    promt_template=load_promt()
    return promt_template.format(level=level,equipment=equipment,goal=goal)


@app.post("/CreateAndGetWorkoutPlans",response_model=List[WorkoutPlan])
def createAndGetWorkoutPlans(item: RequestObject):
    try:
        promt = create_promt(item.fitnessLevel, item.fitnessEquipment, item.fitnessGoal)
        response_from_llm = ask_llm(promt=promt)
        print(response_from_llm)
        return response_from_llm
    
    except ResourceExhausted:
        raise HTTPException(
            status_code=429, 
            detail="Rate limit exceeded. Please try again later."
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )