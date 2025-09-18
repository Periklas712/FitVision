package com.fitVision.FitVision.Services;

import com.fitVision.FitVision.Exception.EmailExistException;
import com.fitVision.FitVision.Exception.UserNotFoundException;
import com.fitVision.FitVision.Exception.WorkoutNotFoundException;
import com.fitVision.FitVision.Models.User;
import com.fitVision.FitVision.Models.WorkoutPlan;
import com.fitVision.FitVision.Repositories.UserRepository;
import com.fitVision.FitVision.Repositories.WorkoutPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    public User getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new UserNotFoundException(userId);
        }
        return user.get();
    }

    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailExistException(user.getEmail());
        }
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        Optional<User> userOptional = userRepository.findById(user.getId());
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException(userOptional.get().getId());
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException(userId);
        }
        userRepository.deleteById(userId);
    }

    public User updateUserWorkoutPlanList(Long userId, Long workoutPlanId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new UserNotFoundException(userId);
        }
        Optional<WorkoutPlan> workoutPlan = workoutPlanRepository.findById(workoutPlanId);
        if (workoutPlan.isEmpty()) {
            throw new WorkoutNotFoundException(workoutPlanId);
        }

        User userToUpdate = user.get();
        userToUpdate.addWorkoutPlan(workoutPlan.get());
        return userRepository.save(userToUpdate);
    }
}
