package com.fitVision.FitVision.Services;

import com.fitVision.FitVision.Dtos.WorkoutPlanDto;
import com.fitVision.FitVision.Dtos.WorkoutPlanRequestDto;
import com.fitVision.FitVision.Exception.UserNotFoundException;
import com.fitVision.FitVision.Exception.WorkoutGenerationException;
import com.fitVision.FitVision.Exception.WorkoutNotFoundException;
import com.fitVision.FitVision.Mappers.WorkoutPlanMapper;
import com.fitVision.FitVision.Models.User;
import com.fitVision.FitVision.Models.WorkoutPlan;
import com.fitVision.FitVision.Repositories.UserRepository;
import com.fitVision.FitVision.Repositories.WorkoutPlanRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class WorkoutPlanService {

    private final WorkoutPlanRepository workoutPlanRepository;
    private final UserRepository userRepository;
    private final WorkoutPlanMapper workoutPlanMapper;
    private final WebClient webClient;
    private final CacheManager cacheManager;

    public WorkoutPlanService(WorkoutPlanRepository workoutPlanRepository,
                               UserRepository userRepository,
                               WorkoutPlanMapper workoutPlanMapper,
                               @Qualifier("fastApiWebClient") WebClient webClient,
                               CacheManager cacheManager) {
        this.workoutPlanRepository = workoutPlanRepository;
        this.userRepository = userRepository;
        this.workoutPlanMapper = workoutPlanMapper;
        this.webClient = webClient;
        this.cacheManager = cacheManager;
    }

    public WorkoutPlan getWorkoutPlan(Long workoutPlanId) {
        return workoutPlanRepository.findById(workoutPlanId)
                .orElseThrow(() -> new WorkoutNotFoundException(workoutPlanId));
    }

    @Cacheable(value = "myPlans", key = "'myPlans:' + #userId")
    @Transactional
    public List<WorkoutPlanDto> getUserWorkoutPlanList(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        log.debug("Fetching user's {} workout plans from DB", userId);
        return workoutPlanMapper.mapAllDtos(user.getMyWorkoutPlans());
    }

    @CacheEvict(value = "myPlans", key = "'myPlans:' + #userId")
    public List<WorkoutPlanDto> createUserWorkoutPlanList(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        WorkoutPlanRequestDto requestDto = new WorkoutPlanRequestDto(user.getLevel().name(), user.getEquipment().name(),
                user.getGoal().name());

        try {
            List<WorkoutPlanDto> generatedWorkoutPlans = webClient.post()
                    .uri("/CreateAndGetWorkoutPlans")
                    .bodyValue(requestDto)
                    .retrieve()
                    .onStatus(HttpStatusCode::isError,
                            response -> response.bodyToMono(String.class)
                                    .map(errorBody -> new WorkoutGenerationException("FastAPI error: " + errorBody)))
                    .bodyToFlux(WorkoutPlanDto.class)
                    .collectList()
                    .block();

            if (generatedWorkoutPlans == null || generatedWorkoutPlans.isEmpty()) {
                throw new WorkoutGenerationException("No workout plans generated from Python service");
            }

            log.info("Received {} workout plans from FastAPI", generatedWorkoutPlans.size());

            List<WorkoutPlan> workoutPlansToSave = new ArrayList<>();
            for (WorkoutPlanDto dto : generatedWorkoutPlans) {
                WorkoutPlan workoutPlan = new WorkoutPlan();
                workoutPlan.setDescription(dto.getDescription());
                workoutPlan.setTitle(dto.getTitle());
                workoutPlan.setDuration(dto.getDuration());
                workoutPlan.setDaysPerWeek(dto.getDaysPerWeek());
                workoutPlan.setUser(user);
                workoutPlansToSave.add(workoutPlan);
            }

            return workoutPlanMapper.mapAllDtos(workoutPlanRepository.saveAll(workoutPlansToSave));

        } catch (WorkoutGenerationException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error calling FastAPI service", e);
            throw new WorkoutGenerationException("Failed to generate workout plans", e);
        }
    }

    @Transactional
    public WorkoutPlan rateWorkoutPlan(Long workoutId, String comment, int stars) {
        WorkoutPlan workoutPlan = workoutPlanRepository.findById(workoutId)
                .orElseThrow(() -> new WorkoutNotFoundException(workoutId));
        if (comment != null) {
            workoutPlan.setComment(comment);
        }
        if (stars >= 0 && stars <= 10) {
            workoutPlan.setStars(stars);
        }
        workoutPlan.setRatedAt(LocalDate.now());

        WorkoutPlan saved = workoutPlanRepository.save(workoutPlan);

        Long userId = saved.getUser().getId();
        Cache cache = cacheManager.getCache("myPlans");
        if (cache != null) {
            cache.evict("myPlans:" + userId);
        }

        return saved;
    }
}
