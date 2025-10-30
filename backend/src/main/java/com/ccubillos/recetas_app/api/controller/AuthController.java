package com.ccubillos.recetas_app.api.controller;

import com.ccubillos.recetas_app.api.dto.auth.AuthDTO;
import com.ccubillos.recetas_app.api.dto.auth.AuthResponseDTO;
import com.ccubillos.recetas_app.model.entity.User;
import com.ccubillos.recetas_app.service.AuthService;
import com.ccubillos.recetas_app.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager, AuthService authService, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody AuthDTO authDTO) {
        User newUser = authService.saveUser(authDTO);
        var token = jwtService.generateToken(newUser);
        return ResponseEntity.ok(new AuthResponseDTO(token));
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        System.out.println("Login successful for user: " + request.getUsername());
        var user = authService.findByUsername(request.getUsername()).orElseThrow();
        var token = jwtService.generateToken(user);
        return ResponseEntity.ok(new AuthResponseDTO(token));
    }

}
