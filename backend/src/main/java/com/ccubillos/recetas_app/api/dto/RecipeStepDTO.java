package com.ccubillos.recetas_app.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RecipeStepDTO {
    private Long id;
    private String description;
}
