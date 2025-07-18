package com.fitVision.FitVision.Mappers;

import com.fitVision.FitVision.Dtos.WorkoutPlanDto;
import com.fitVision.FitVision.Models.WorkoutPlan;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WorkoutPlanMapper {
    @Mapping(source = "user.id",target = "userId")
    WorkoutPlanDto map(WorkoutPlan workoutPlan);

    @InheritInverseConfiguration
    @Mapping(target = "user",ignore = true)
    WorkoutPlan map(WorkoutPlanDto workoutPlanDto);
}
