package com.ccubillos.recetas_app.service;

import com.ccubillos.recetas_app.api.dto.auth.AuthDTO;
import com.ccubillos.recetas_app.model.entity.User;
import com.ccubillos.recetas_app.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User saveUser(AuthDTO newUserData) {
        User user = new User();
        if(userRepository.findByUsername(newUserData.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        user.setUsername(newUserData.getUsername());
        String hashedPassword = passwordEncoder.encode(newUserData.getPassword());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }


}
