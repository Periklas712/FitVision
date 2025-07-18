package com.fitVision.FitVision.Services;

import com.fitVision.FitVision.Dtos.WorkoutPlanDto;
import com.fitVision.FitVision.Dtos.WorkoutPlanRequestDto;
import com.fitVision.FitVision.Models.Enums.FitnessEquipment;
import com.fitVision.FitVision.Models.Enums.FitnessGoal;
import com.fitVision.FitVision.Models.Enums.FitnessLevel;
import com.fitVision.FitVision.Models.User;
import com.fitVision.FitVision.Models.WorkoutPlan;
import com.fitVision.FitVision.Repositories.UserRepository;
import com.fitVision.FitVision.Repositories.WorkoutPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatusCode;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutPlanService {

    @Autowired
    WorkoutPlanRepository workoutPlanRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    @Qualifier("fastApiWebClient")
    private WebClient webClient;

    public WorkoutPlan getWorkoutPlan(Long WorkoutPlanId) {
        Optional<WorkoutPlan> workoutPlanOptional = workoutPlanRepository.findById(WorkoutPlanId);
        if (workoutPlanOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No workout plan found with id: " + WorkoutPlanId);
        }
        return workoutPlanOptional.get();
    }

    public List<WorkoutPlan> getUserWorkoutPlanList(Long userId){
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id: " + userId);
        }

        return userOptional.get().getMyWorkoutPlans();

    }

    public void createUserWorkoutPlanList(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id: " + userId);
        }
        User user = userOptional.get();

        WorkoutPlanRequestDto requestDto = new WorkoutPlanRequestDto(user.getLevel().name(),user.getEquipment().name(),user.getGoal().name());

        try{
            List<WorkoutPlanDto> generatedWorkoutPlans = webClient.post()
                    .uri("/CreateAndGetWorkoutPlans")
                    .bodyValue(requestDto)
                    .retrieve()
                    .onStatus(HttpStatusCode::isError,
                            response -> response.bodyToMono(String.class)
                                    .map(errorBody -> new RuntimeException("FastAPI Error: " + errorBody)))
                    .bodyToFlux(WorkoutPlanDto.class)
                    .collectList()
                    .block();

            if (generatedWorkoutPlans == null || generatedWorkoutPlans.isEmpty()) {
                throw new RuntimeException("No workout plans generated from Python service");
            }

            System.out.println("Received " + generatedWorkoutPlans.size() + " workout plans from FastAPI");

            for (WorkoutPlanDto dto : generatedWorkoutPlans) {
                WorkoutPlan workoutPlan = new WorkoutPlan();
                workoutPlan.setDescription(dto.getDescription());
                workoutPlan.setTitle(dto.getTitle());
                workoutPlan.setDuration(dto.getDuration());
                workoutPlan.setDaysPerWeek(dto.getDaysPerWeek());
                workoutPlan.setUser(userOptional.get());
                workoutPlanRepository.save(workoutPlan);

            }

        } catch (Exception e) {
            System.err.println("Error calling FastAPI service: " + e.getMessage());
            throw new RuntimeException("Failed to generate workout plans: " + e.getMessage(), e);
        }
    }

}
