package com.fitVision.FitVision.Services;

import com.fitVision.FitVision.Dtos.CreateUserRequest;
import com.fitVision.FitVision.Dtos.UpdateUserRequest;
import com.fitVision.FitVision.Exception.EmailExistException;
import com.fitVision.FitVision.Exception.UserNotFoundException;
import com.fitVision.FitVision.Exception.WorkoutNotFoundException;
import com.fitVision.FitVision.Models.User;
import com.fitVision.FitVision.Models.WorkoutPlan;
import com.fitVision.FitVision.Repositories.UserRepository;
import com.fitVision.FitVision.Repositories.WorkoutPlanRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final WorkoutPlanRepository workoutPlanRepository;

    public UserService(UserRepository userRepository, WorkoutPlanRepository workoutPlanRepository) {
        this.userRepository = userRepository;
        this.workoutPlanRepository = workoutPlanRepository;
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }

    public User createUser(CreateUserRequest user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailExistException(user.getEmail());
        }
        User userToSave = new User(user);
        return userRepository.save(userToSave);
    }

    public User updateUser(UpdateUserRequest userRequest) {
        User user = userRepository.findById(userRequest.getId())
                .orElseThrow(() -> new UserNotFoundException(userRequest.getId()));

        if (userRequest.getEmail() != null && !userRequest.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(userRequest.getEmail())) {
                throw new EmailExistException(userRequest.getEmail());
            }
            user.setEmail(userRequest.getEmail());
        }
        if (userRequest.getUsername() != null) {
            user.setUsername(userRequest.getUsername());
        }
        if (userRequest.getEquipment() != null) {
            user.setEquipment(userRequest.getEquipment());
        }
        if (userRequest.getGoal() != null) {
            user.setGoal(userRequest.getGoal());
        }
        if (userRequest.getLevel() != null) {
            user.setLevel(userRequest.getLevel());
        }
        return userRepository.save(user);
    }

    @CacheEvict(value = "myPlans", key = "'myPlans:' + #userId")
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException(userId);
        }
        userRepository.deleteById(userId);
    }

    @CacheEvict(value = "myPlans", key = "'myPlans:' + #userId")
    public User updateUserWorkoutPlanList(Long userId, Long workoutPlanId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        WorkoutPlan workoutPlan = workoutPlanRepository.findById(workoutPlanId)
                .orElseThrow(() -> new WorkoutNotFoundException(workoutPlanId));

        user.addWorkoutPlan(workoutPlan);
        return userRepository.save(user);
    }
}
