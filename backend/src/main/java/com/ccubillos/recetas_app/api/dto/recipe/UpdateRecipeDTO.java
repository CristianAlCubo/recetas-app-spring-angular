package com.ccubillos.recetas_app.api.dto.recipe;


import jakarta.validation.constraints.NotBlank;
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
public class UpdateRecipeDTO extends BaseRecipeDTO {
    private List<
            @NotBlank(message = "El nombre del ingrediente no puede estar vacío")
                    String> ingredients;

    private List<
            @NotBlank(message = "La descripción del paso no puede estar vacía")
                    String> steps;
}
