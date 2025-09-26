package com.fitVision.FitVision.Controllers;

import com.fitVision.FitVision.Dtos.WorkoutPlanDto;
import com.fitVision.FitVision.Mappers.WorkoutPlanMapper;
import com.fitVision.FitVision.Services.WorkoutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/workoutPlans")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanMapper workoutPlanMapper;
    @Autowired
    private WorkoutPlanService workoutPlanService;

    @GetMapping("getWorkoutPlanById")
    public WorkoutPlanDto getWorkoutPlanById(@RequestParam("workoutPlanId") Long workoutPlanId) {
        return workoutPlanMapper.map(workoutPlanService.getWorkoutPlan(workoutPlanId));
    }

    @GetMapping("getUserWorkoutPlanList")
    public List<WorkoutPlanDto> getUserWorkoutPlanList(@RequestParam("userId") Long userId) {
        return workoutPlanService.getUserWorkoutPlanList(userId);

    }

    @PostMapping("createUserWorkoutPlanList")
    public void createUserWorkoutPlanList(@RequestParam("userId") Long userId) {
        workoutPlanService.createUserWorkoutPlanList(userId);
    }

}
