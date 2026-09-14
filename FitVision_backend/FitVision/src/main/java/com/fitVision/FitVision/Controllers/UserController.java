package com.fitVision.FitVision.Controllers;

import com.fitVision.FitVision.Dtos.CreateUserRequest;
import com.fitVision.FitVision.Dtos.UpdateUserRequest;
import com.fitVision.FitVision.Dtos.UserDto;
import com.fitVision.FitVision.Mappers.UserMapper;
import com.fitVision.FitVision.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @GetMapping("getUserById")
    public UserDto getUserById(@RequestParam("userId") Long userId) {
        return userMapper.map(userService.getUserById(userId));
    }

    @PostMapping("createUser")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody CreateUserRequest userRequest) {
        UserDto created = userMapper.map(userService.createUser(userRequest));
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("updateUser")
    public UserDto updateUser(@Valid @RequestBody UpdateUserRequest userRequest) {
        return userMapper.map(userService.updateUser(userRequest));
    }

    @DeleteMapping("deleteUser")
    public ResponseEntity<Void> deleteUser(@RequestParam("userId") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

}
