package com.fitVision.FitVision.Exception;

public class WorkoutNotFoundException extends RuntimeException {
    public WorkoutNotFoundException(Long id) {
        super("Workout plan with id : " + id + " not found");
    }
}
