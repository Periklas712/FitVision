package com.fitVision.FitVision.Controllers;

import com.fitVision.FitVision.Dtos.WorkoutPlanDto;
import com.fitVision.FitVision.Mappers.WorkoutPlanMapper;
import com.fitVision.FitVision.Services.WorkoutPlanService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/workoutPlans")
public class WorkoutPlanController {

    private final WorkoutPlanMapper workoutPlanMapper;
    private final WorkoutPlanService workoutPlanService;

    public WorkoutPlanController(WorkoutPlanMapper workoutPlanMapper, WorkoutPlanService workoutPlanService) {
        this.workoutPlanMapper = workoutPlanMapper;
        this.workoutPlanService = workoutPlanService;
    }

    @GetMapping("getWorkoutPlanById")
    public WorkoutPlanDto getWorkoutPlanById(@RequestParam("workoutPlanId") Long workoutPlanId) {
        return workoutPlanMapper.map(workoutPlanService.getWorkoutPlan(workoutPlanId));
    }

    @GetMapping("getUserWorkoutPlanList")
    public List<WorkoutPlanDto> getUserWorkoutPlanList(@RequestParam("userId") Long userId) {
        return workoutPlanService.getUserWorkoutPlanList(userId);

    }

    @PostMapping("createUserWorkoutPlanList")
    public List<WorkoutPlanDto> createUserWorkoutPlanList(@RequestParam("userId") Long userId) {
        return workoutPlanService.createUserWorkoutPlanList(userId);
    }

    @PatchMapping("rateWorkoutPlan")
    @Validated
    public WorkoutPlanDto rateWorkoutPLan(@RequestParam("workoutPlanId") Long workoutPlanId, @RequestParam("comment") String comment,
                                          @Max(10) @Min(0) @RequestParam("stars") int stars) {
        return workoutPlanMapper.map(workoutPlanService.rateWorkoutPlan(workoutPlanId, comment, stars));
    }

}
