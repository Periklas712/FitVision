package com.fitVision.FitVision.Services;

import com.fitVision.FitVision.Models.User;
import com.fitVision.FitVision.Models.WorkoutPlan;
import com.fitVision.FitVision.Repositories.UserRepository;
import com.fitVision.FitVision.Repositories.WorkoutPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;


    public User getUserById(Long userId) {
      Optional<User> user = userRepository.findById(userId);
      if (user.isEmpty()) {
          throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id: " + userId);
      }
        return user.get();
    }

    public User createUser(User user){
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }
        return userRepository.save(user);
    }

    public User updateUser(User user){
        Optional<User> userOptional = userRepository.findById(user.getId());
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id: " + user.getId());
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id: " + userId);
        }
         userRepository.deleteById(userId);
    }

    public User updateUserWorkoutPlanList(Long userId, Long workoutPlanId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id: " + userId);
        }
        Optional<WorkoutPlan> workoutPlan = workoutPlanRepository.findById(workoutPlanId);
        if (workoutPlan.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No workout plan found with id: " + workoutPlanId);
        }

        User userToUpdate = user.get();
        userToUpdate.addWorkoutPlan(workoutPlan.get());
        return userRepository.save(userToUpdate);
    }
}
