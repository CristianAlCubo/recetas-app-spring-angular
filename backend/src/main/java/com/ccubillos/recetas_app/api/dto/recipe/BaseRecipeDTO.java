package com.ccubillos.recetas_app.api.dto.recipe;

import com.ccubillos.recetas_app.model.enums.FoodCategory;
import com.ccubillos.recetas_app.model.enums.RecipeDifficulty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Data
public class BaseRecipeDTO {

    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @NotBlank(message = "La descripción es obligatoria")
    private String description;

    //    @NotBlank(message = "La URL de imagen es obligatoria") TODO: Implementar servicio de subida de imágenes a futuro
    @Pattern(regexp = "^(https?|ftp)://.*$", message = "La URL de imagen debe tener un formato válido")
    private String imgUrl;

    @NotNull(message = "El tiempo de preparación es obligatorio")
    @Min(value = 1, message = "El tiempo de preparación debe ser al menos 1 minuto")
    private Integer preparationTime;

    @NotNull(message = "El tiempo de cocción es obligatorio")
    @Min(value = 1, message = "El tiempo de cocción debe ser al menos 1 minuto")
    private Integer cookTime;

    @NotNull(message = "Las porciones son obligatorias")
    @Min(value = 1, message = "Debe haber al menos una porción")
    private Integer servings;

    @NotNull(message = "La categoría es obligatoria")
    private FoodCategory category;

    @NotNull(message = "La dificultad es obligatoria")
    private RecipeDifficulty difficulty;
}
