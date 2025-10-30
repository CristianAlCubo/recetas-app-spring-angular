package com.ccubillos.recetas_app.service;

import com.ccubillos.recetas_app.api.dto.recipe.CreateRecipeDTO;
import com.ccubillos.recetas_app.api.dto.recipe.UpdateRecipeDTO;
import com.ccubillos.recetas_app.api.mapper.RecipeMapper;
import com.ccubillos.recetas_app.model.entity.Recipe;
import com.ccubillos.recetas_app.model.entity.RecipeIngredient;
import com.ccubillos.recetas_app.model.entity.RecipeStep;
import com.ccubillos.recetas_app.repository.RecipeRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }

    @Transactional
    public Recipe createRecipe(CreateRecipeDTO dto) {
        Recipe recipe = RecipeMapper.fromCreateDTOToEntity(dto);
        mapIngredientsAndSteps(recipe, dto.getIngredients(), dto.getSteps());

        return recipeRepository.save(recipe);
    }

    @Transactional
    public Recipe updateRecipe(Long id, UpdateRecipeDTO dto) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe == null) {
            return null;
        }
        RecipeMapper.fromUpdateDTOToEntity(recipe, dto);

        // Actualizar colecciones: limpia y agrega
        recipe.getIngredients().clear();
        recipe.getSteps().clear();
        mapIngredientsAndSteps(recipe, dto.getIngredients(), dto.getSteps());

        return recipeRepository.save(recipe);
    }

    @Transactional
    public Recipe deleteRecipe(Long id) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe != null) {
            recipeRepository.delete(recipe);
        }
        return recipe;
    }

    private void mapIngredientsAndSteps(Recipe recipe, List<String> ingredients, List<String> steps) {
        if (ingredients != null) {
            recipe.getIngredients().addAll(
                    ingredients.stream()
                            .map(name -> new RecipeIngredient(name, recipe))
                            .toList()
            );
        }

        if (steps != null) {
            recipe.getSteps().addAll(
                    steps.stream()
                            .map(description -> new RecipeStep(description, recipe))
                            .toList()
            );
        }
    }
}
