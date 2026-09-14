package com.fitVision.FitVision.Exception;

public class WorkoutGenerationException extends RuntimeException {
    public WorkoutGenerationException(String message) {
        super(message);
    }

    public WorkoutGenerationException(String message, Throwable cause) {
        super(message, cause);
    }
}
