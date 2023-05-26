package com.verduttio.cinemaapp.controller.rest;

import com.verduttio.cinemaapp.entity.User;
import com.verduttio.cinemaapp.entity.UserSafeData;
import com.verduttio.cinemaapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserSafeData> getAllUsersSafeData() {
        return userService.getAllUsersSafeData();
    }

    @DeleteMapping("/{userId}")
    public void removeUser(@PathVariable String userId) {
        userService.removeUser(userId);
    }
}
