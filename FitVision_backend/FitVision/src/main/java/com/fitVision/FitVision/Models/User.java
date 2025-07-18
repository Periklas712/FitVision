package com.fitVision.FitVision.Models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fitVision.FitVision.Models.Enums.FitnessEquipment;
import com.fitVision.FitVision.Models.Enums.FitnessGoal;
import com.fitVision.FitVision.Models.Enums.FitnessLevel;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name="Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    @Email
    private String email;
    @NotNull
    @Enumerated(EnumType.STRING)
    private FitnessLevel level;
    @NotNull
    @Enumerated(EnumType.STRING)
    private FitnessGoal goal;
    @NotNull
    @Enumerated(EnumType.STRING)
    private FitnessEquipment equipment;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<WorkoutPlan> myWorkoutPlans;

    public User() {}
    public User(String username,String email,FitnessLevel level,FitnessGoal goal,FitnessEquipment equipment ){
        this.username=username;
        this.email=email;
        this.level=level;
        this.goal=goal;
        this.equipment=equipment;
    }

    public String getUsername() {
        return username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public @Email String getEmail() {
        return email;
    }

    public void setEmail(@Email String email) {
        this.email = email;
    }

    public FitnessLevel getLevel() {
        return level;
    }

    public void setLevel(FitnessLevel level) {
        this.level = level;
    }

    public FitnessGoal getGoal() {
        return goal;
    }

    public void setGoal(FitnessGoal goal) {
        this.goal = goal;
    }

    public FitnessEquipment getEquipment() {
        return equipment;
    }

    public void setEquipment(FitnessEquipment equipment) {
        this.equipment = equipment;
    }

    public List<WorkoutPlan> getMyWorkoutPlans() {
        return myWorkoutPlans;
    }

    public void setMyWorkoutPlans(List<WorkoutPlan> myWorkoutPlans) {
        this.myWorkoutPlans = myWorkoutPlans;
    }

    public void addWorkoutPlan(WorkoutPlan workoutPlan){
        myWorkoutPlans.add(workoutPlan);
    }
}
