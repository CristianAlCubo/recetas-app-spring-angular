package com.ccubillos.recetas_app.api.controller;

import com.ccubillos.recetas_app.api.response.HTTPAPIListResponse;
import com.ccubillos.recetas_app.api.response.ResponseFactory;
import com.ccubillos.recetas_app.model.enums.RecipeDifficulty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recipe-difficulty")
public class RecipeDifficultyController {

    private final ResponseFactory responseFactory;

    public RecipeDifficultyController(ResponseFactory responseFactory) {
        this.responseFactory = responseFactory;
    }

    @GetMapping
    public ResponseEntity<HTTPAPIListResponse<RecipeDifficulty>> getAllRecipeDifficulties() {
        return responseFactory.listSuccess(List.of(RecipeDifficulty.values()), "Recipe difficulties retrieved successfully");
    }
}
