package com.fitVision.FitVision.Dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class WorkoutPlanDto {
    private Long id;
    private String title;
    private String description;
    private int duration;
    private int daysPerWeek;
    private Long userId;
    private String summary;
    private String comment;
    private LocalDate ratedAt;
    private int stars;
}
