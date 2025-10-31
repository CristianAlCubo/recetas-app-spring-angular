package com.ccubillos.recetas_app.api.controller;

import com.ccubillos.recetas_app.api.dto.auth.AuthDTO;
import com.ccubillos.recetas_app.api.dto.auth.AuthResponseDTO;
import com.ccubillos.recetas_app.api.response.HTTPAPISingleResponse;
import com.ccubillos.recetas_app.api.response.ResponseFactory;
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
    private final ResponseFactory responseFactory;

    public AuthController(AuthenticationManager authenticationManager, AuthService authService, JwtService jwtService, ResponseFactory responseFactory) {
        this.authenticationManager = authenticationManager;
        this.authService = authService;
        this.jwtService = jwtService;
        this.responseFactory = responseFactory;
    }

    @PostMapping("/register")
    public ResponseEntity<HTTPAPISingleResponse<AuthResponseDTO>> register(@RequestBody AuthDTO authDTO) {
        User newUser = authService.saveUser(authDTO);
        var token = jwtService.generateToken(newUser);
        return responseFactory.success(new AuthResponseDTO(token), 200, "User registered successfully");
    }


    @PostMapping("/login")
    public ResponseEntity<HTTPAPISingleResponse<AuthResponseDTO>> login(@RequestBody AuthDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        var user = authService.findByUsername(request.getUsername()).orElseThrow();
        var token = jwtService.generateToken(user);
        return responseFactory.success(new AuthResponseDTO(token), 200, "Login successful");
    }
}
