package com.ccubillos.recetas_app.api.controller;

import com.ccubillos.recetas_app.api.dto.recipe.CreateRecipeDTO;
import com.ccubillos.recetas_app.api.dto.recipe.RecipeDTO;
import com.ccubillos.recetas_app.api.dto.recipe.UpdateRecipeDTO;
import com.ccubillos.recetas_app.api.mapper.RecipeMapper;
import com.ccubillos.recetas_app.api.response.HTTPAPIListResponse;
import com.ccubillos.recetas_app.api.response.HTTPAPISingleResponse;
import com.ccubillos.recetas_app.api.response.ResponseFactory;
import com.ccubillos.recetas_app.model.entity.Recipe;
import com.ccubillos.recetas_app.service.JwtService;
import com.ccubillos.recetas_app.service.RecipeService;
import io.swagger.v3.oas.annotations.headers.Header;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/recipe")
public class RecipeController {

    private final RecipeService recipeService;
    private final ResponseFactory responseFactory;
    private final JwtService jwtService;

    public RecipeController(RecipeService recipeService, ResponseFactory responseFactory, JwtService jwtService) {
        this.recipeService = recipeService;
        this.responseFactory = responseFactory;
        this.jwtService = jwtService;
    }

    @GetMapping
    public ResponseEntity<HTTPAPIListResponse<RecipeDTO>> getAllRecipes(@RequestHeader("Authorization") String authorizationHeader) {
        String username = extractUsernameFromTokenOrThrow(authorizationHeader);
        List<RecipeDTO> recipes = recipeService.getAllRecipes(username)
                .stream()
                .map(RecipeMapper::fromEntityToDTO)
                .toList();

        return responseFactory.listSuccess(recipes, "Recipes retrieved successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<HTTPAPISingleResponse<RecipeDTO>> getRecipeById(@PathVariable Long id) {
        Recipe recipe = recipeService.getRecipeById(id);
        if (recipe == null) {
            return responseFactory.failure(404, "Recipe not found");
        }

        RecipeDTO recipeDTO = RecipeMapper.fromEntityToDTO(recipe);
        return responseFactory.success(recipeDTO, 200, "Recipe retrieved successfully");
    }

    @PostMapping
    public ResponseEntity<HTTPAPISingleResponse<RecipeDTO>> createRecipe(@Valid @RequestBody CreateRecipeDTO dto, @RequestHeader("Authorization") String authorizationHeader) {
        String username = extractUsernameFromTokenOrThrow(authorizationHeader);
        Recipe recipe = recipeService.createRecipe(dto, username);
        RecipeDTO recipeDTO = RecipeMapper.fromEntityToDTO(recipe);
        return responseFactory.success(recipeDTO, 201, "Recipe created successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<HTTPAPISingleResponse<RecipeDTO>> updateRecipe(
            @PathVariable Long id,
            @Valid @RequestBody UpdateRecipeDTO dto
    ) {
        Recipe recipe = recipeService.updateRecipe(id, dto);
        if (recipe == null) {
            return responseFactory.failure(404, "Recipe not found");
        }

        RecipeDTO recipeDTO = RecipeMapper.fromEntityToDTO(recipe);
        return responseFactory.success(recipeDTO, 200, "Recipe updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HTTPAPISingleResponse<RecipeDTO>> deleteRecipe(@PathVariable Long id) {
        Recipe recipe = recipeService.deleteRecipe(id);
        if (recipe == null) {
            return responseFactory.failure(404, "Recipe not found");
        }

        RecipeDTO recipeDTO = RecipeMapper.fromEntityToDTO(recipe);
        return responseFactory.success(recipeDTO, 200, "Recipe deleted successfully");
    }

    private String extractUsernameFromTokenOrThrow(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Unauthorized: Missing or invalid Authorization header");
        }
        String token = authorizationHeader.substring(7);
        return jwtService.extractUsername(token);
    }
}