package com.ccubillos.recetas_app.api.controller;

import com.ccubillos.recetas_app.api.dto.recipe.CreateRecipeDTO;
import com.ccubillos.recetas_app.api.dto.recipe.RecipeDTO;
import com.ccubillos.recetas_app.api.dto.recipe.UpdateRecipeDTO;
import com.ccubillos.recetas_app.api.mapper.RecipeMapper;
import com.ccubillos.recetas_app.api.response.HTTPAPIListResponse;
import com.ccubillos.recetas_app.api.response.HTTPAPISingleResponse;
import com.ccubillos.recetas_app.api.response.ResponseFactory;
import com.ccubillos.recetas_app.model.entity.Recipe;
import com.ccubillos.recetas_app.service.RecipeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/recipe")
public class RecipeController {

    private final RecipeService recipeService;
    private final ResponseFactory responseFactory;

    public RecipeController(RecipeService recipeService, ResponseFactory responseFactory) {
        this.recipeService = recipeService;
        this.responseFactory = responseFactory;
    }

    @GetMapping
    public ResponseEntity<HTTPAPIListResponse<RecipeDTO>> getAllRecipes() {
        List<RecipeDTO> recipes = recipeService.getAllRecipes()
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
    public ResponseEntity<HTTPAPISingleResponse<RecipeDTO>> createRecipe(@Valid @RequestBody CreateRecipeDTO dto) {
        Recipe recipe = recipeService.createRecipe(dto);
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
}