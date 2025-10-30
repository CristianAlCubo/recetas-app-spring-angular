package com.ccubillos.recetas_app.service;

import com.ccubillos.recetas_app.model.entity.User;
import com.ccubillos.recetas_app.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

}
