package com.fitVision.FitVision.Models.Enums;


import java.util.List;

public  class EnumResponse {
    private final List<FitnessEquipment> fitnessEquipment;
    private final List<FitnessGoal> fitnessGoal;
    private final List<FitnessLevel> fitnessLevel;

    public EnumResponse(List<FitnessEquipment> fitnessEquipment, List<FitnessGoal> fitnessGoal, List<FitnessLevel> fitnessLevel) {
        this.fitnessEquipment = fitnessEquipment;
        this.fitnessGoal = fitnessGoal;
        this.fitnessLevel = fitnessLevel;
    }

    public List<FitnessEquipment> getFitnessEquipment() {
        return fitnessEquipment;
    }

    public List<FitnessGoal> getFitnessGoal() {
        return fitnessGoal;
    }

    public List<FitnessLevel> getFitnessLevel() {
        return fitnessLevel;
    }
}
