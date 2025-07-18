package com.fitVision.FitVision.Controllers;

import com.fitVision.FitVision.Dtos.WorkoutPlanDto;
import com.fitVision.FitVision.Mappers.WorkoutPlanMapper;
import com.fitVision.FitVision.Models.Enums.FitnessEquipment;
import com.fitVision.FitVision.Models.Enums.FitnessGoal;
import com.fitVision.FitVision.Models.Enums.FitnessLevel;
import com.fitVision.FitVision.Services.WorkoutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/workoutPlans")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanMapper workoutPlanMapper;
    @Autowired
    private WorkoutPlanService workoutPlanService;

    @GetMapping("getWorkoutPlanById")
    public WorkoutPlanDto getWorkoutPlanById(@RequestParam("workoutPlanId")Long workoutPlanId){
        return workoutPlanMapper.map(workoutPlanService.getWorkoutPlan(workoutPlanId));
    }

    @GetMapping("getUserWorkoutPlanList")
    public List<WorkoutPlanDto> getUserWorkoutPlanList(@RequestParam("userId")Long userId){
        return workoutPlanService.getUserWorkoutPlanList(userId).stream()
                .map(workoutPlanMapper::map)
                .collect(Collectors.toList());
    }

    @PostMapping("createUserWorkoutPlanList")
    public void createUserWorkoutPlanList(@RequestParam("userId") Long userId){
        workoutPlanService.createUserWorkoutPlanList(userId);
    }

}
