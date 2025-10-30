package com.ccubillos.recetas_app.api.mapper;

import com.ccubillos.recetas_app.api.dto.recipe.CreateRecipeDTO;
import com.ccubillos.recetas_app.api.dto.recipe.RecipeDTO;
import com.ccubillos.recetas_app.api.dto.RecipeIngredientDTO;
import com.ccubillos.recetas_app.api.dto.RecipeStepDTO;
import com.ccubillos.recetas_app.api.dto.recipe.UpdateRecipeDTO;
import com.ccubillos.recetas_app.model.entity.Recipe;

public class RecipeMapper {

    public static Recipe fromCreateDTOToEntity(CreateRecipeDTO dto) {
        return Recipe.builder()
                .name(dto.getName())
                .description(dto.getDescription())
//                .imgUrl(dto.getImgUrl()) TODO: Implementar servicio de subida de imágenes a futuro
                .imgUrl("https://static.vecteezy.com/system/resources/previews/047/411/185/non_2x/food-logo-icon-symbol-silhouette-on-white-background-free-vector.jpg") // Imagen por defecto por ahora
                .preparationTime(dto.getPreparationTime())
                .cookTime(dto.getCookTime())
                .servings(dto.getServings())
                .difficulty(dto.getDifficulty())
                .category(dto.getCategory())
                .build();
    }

    public static Recipe fromDTOToEntity(RecipeDTO dto) {
        return Recipe.builder()
                .id(dto.getId())
                .name(dto.getName())
                .description(dto.getDescription())
                .imgUrl(dto.getImgUrl())
                .preparationTime(dto.getPreparationTime())
                .cookTime(dto.getCookTime())
                .servings(dto.getServings())
                .difficulty(dto.getDifficulty())
                .category(dto.getCategory())
                .build();
    }

    public static void fromUpdateDTOToEntity(Recipe recipe, UpdateRecipeDTO dto) {
        recipe.setName(dto.getName());
        recipe.setDescription(dto.getDescription());
        //recipe.setImgUrl(dto.getImgUrl()); TODO: Implementar servicio de subida de imágenes a futuro. Imagen por defecto por ahora
        recipe.setImgUrl("https://static.vecteezy.com/system/resources/previews/047/411/185/non_2x/food-logo-icon-symbol-silhouette-on-white-background-free-vector.jpg");
        recipe.setPreparationTime(dto.getPreparationTime());
        recipe.setCookTime(dto.getCookTime());
        recipe.setServings(dto.getServings());
        recipe.setDifficulty(dto.getDifficulty());
        recipe.setCategory(dto.getCategory());
        // NOTA: Ingredientes y pasos se manejan en el servicio
    }

    public static RecipeDTO fromEntityToDTO(Recipe recipe) {
        return RecipeDTO.builder()
                .id(recipe.getId())
                .name(recipe.getName())
                .description(recipe.getDescription())
                .imgUrl(recipe.getImgUrl())
                .preparationTime(recipe.getPreparationTime())
                .cookTime(recipe.getCookTime())
                .servings(recipe.getServings())
                .difficulty(recipe.getDifficulty())
                .category(recipe.getCategory())
                .steps(recipe.getSteps().stream()
                        .map(step -> new RecipeStepDTO(step.getId(), step.getDescription()))
                        .toList())
                .ingredients(recipe.getIngredients().stream()
                        .map(ingredient -> new RecipeIngredientDTO(ingredient.getId(), ingredient.getName()))
                        .toList())
                .build();
    }
}
