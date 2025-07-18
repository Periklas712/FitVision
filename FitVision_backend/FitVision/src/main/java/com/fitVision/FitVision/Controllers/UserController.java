package com.fitVision.FitVision.Controllers;

import com.fitVision.FitVision.Dtos.UserDto;
import com.fitVision.FitVision.Mappers.UserMapper;
import com.fitVision.FitVision.Models.User;
import com.fitVision.FitVision.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserMapper userMapper;


    @GetMapping("getUserById")
    public UserDto getUserById(@RequestParam("userId") Long userId){
        return userMapper.map(userService.getUserById(userId));
    }

    @PostMapping("createUser")
    public UserDto createUser(@RequestBody User user){
        return userMapper.map(userService.createUser(user));
    }

    @PutMapping("updateUser")
    public UserDto updateUser(@RequestBody User user){
        return userMapper.map(userService.updateUser(user));
    }

    @DeleteMapping("deleteUser")
    public void deleteUser(@RequestParam("userId") Long userId){
         userService.deleteUser(userId);
    }






}
