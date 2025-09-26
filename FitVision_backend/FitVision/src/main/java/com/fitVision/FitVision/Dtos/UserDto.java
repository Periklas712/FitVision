package com.fitVision.FitVision.Dtos;

import com.fitVision.FitVision.Models.Enums.FitnessEquipment;
import com.fitVision.FitVision.Models.Enums.FitnessGoal;
import com.fitVision.FitVision.Models.Enums.FitnessLevel;
import com.fitVision.FitVision.Models.WorkoutPlan;

import java.util.List;

public class UserDto {
    private Long id;
    private String username;
    private String email;
    private FitnessGoal goal;
    private FitnessLevel level;
    private FitnessEquipment equipment;
    private List<WorkoutPlan> myPlans;

    public UserDto(Long id, String username, String email, FitnessGoal goal, FitnessLevel level,
            FitnessEquipment equipment, List<WorkoutPlan> myPlans) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.goal = goal;
        this.level = level;
        this.equipment = equipment;
        this.myPlans = myPlans;
    }

    public UserDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<WorkoutPlan> getMyPlans() {
        return myPlans;
    }

    public void setMyPlans(List<WorkoutPlan> myPlans) {
        this.myPlans = myPlans;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public FitnessGoal getGoal() {
        return goal;
    }

    public void setGoal(FitnessGoal goal) {
        this.goal = goal;
    }

    public FitnessLevel getLevel() {
        return level;
    }

    public void setLevel(FitnessLevel level) {
        this.level = level;
    }

    public FitnessEquipment getEquipment() {
        return equipment;
    }

    public void setEquipment(FitnessEquipment equipment) {
        this.equipment = equipment;
    }
}
