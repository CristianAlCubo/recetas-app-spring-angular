package com.ccubillos.recetas_app.api.dto.recipe;

import com.ccubillos.recetas_app.api.dto.RecipeIngredientDTO;
import com.ccubillos.recetas_app.api.dto.RecipeStepDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;


@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class RecipeDTO extends BaseRecipeDTO {
    private Long id;
    private List<RecipeIngredientDTO> ingredients;
    private List<RecipeStepDTO> steps;
}
