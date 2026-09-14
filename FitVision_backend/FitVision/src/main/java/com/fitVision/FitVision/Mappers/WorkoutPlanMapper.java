package com.fitVision.FitVision.Mappers;

import com.fitVision.FitVision.Dtos.WorkoutPlanDto;
import com.fitVision.FitVision.Models.WorkoutPlan;

import java.util.List;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WorkoutPlanMapper {

    @Mapping(source = "user.id",target = "userId")
    List<WorkoutPlanDto> mapAllDtos(List<WorkoutPlan> workoutPlansToSave);

    @InheritInverseConfiguration
    @Mapping(target = "user",ignore = true)
    WorkoutPlan map(WorkoutPlanDto workoutPlanDto);

   @Mapping(source = "user.id", target = "userId")
    WorkoutPlanDto map(WorkoutPlan workout);
}
