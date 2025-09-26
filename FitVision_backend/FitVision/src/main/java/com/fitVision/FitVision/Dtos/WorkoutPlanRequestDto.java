package com.fitVision.FitVision.Dtos;

public class WorkoutPlanRequestDto {
    private String fitnessLevel;
    private String fitnessEquipment;
    private String fitnessGoal;

    public WorkoutPlanRequestDto(String fitnessLevel, String fitnessEquipment, String fitnessGoal) {
        this.fitnessLevel = fitnessLevel;
        this.fitnessEquipment = fitnessEquipment;
        this.fitnessGoal = fitnessGoal;
    }

    public String getFitnessLevel() {
        return fitnessLevel;
    }

    public void setFitnessLevel(String fitnessLevel) {
        this.fitnessLevel = fitnessLevel;
    }

    public String getFitnessEquipment() {
        return fitnessEquipment;
    }

    public void setFitnessEquipment(String fitnessEquipment) {
        this.fitnessEquipment = fitnessEquipment;
    }

    public String getFitnessGoal() {
        return fitnessGoal;
    }

    public void setFitnessGoal(String fitnessGoal) {
        this.fitnessGoal = fitnessGoal;
    }

    @Override
    public String toString() {
        return "WorkoutPlanRequestDto{" +
                "fitnessLevel='" + fitnessLevel + '\'' +
                ", fitnessEquipment='" + fitnessEquipment + '\'' +
                ", fitnessGoal='" + fitnessGoal + '\'' +
                '}';
    }
}
