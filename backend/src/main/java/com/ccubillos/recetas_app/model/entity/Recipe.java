package com.ccubillos.recetas_app.model.entity;

import com.ccubillos.recetas_app.model.enums.FoodCategory;
import com.ccubillos.recetas_app.model.enums.RecipeDifficulty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String imgUrl;
    private Integer preparationTime;
    private Integer cookTime;
    private Integer servings;

    @Enumerated(EnumType.STRING)
    private FoodCategory category;
    @Enumerated(EnumType.STRING)
    private RecipeDifficulty difficulty;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<RecipeIngredient> ingredients = new ArrayList<>();
    @Builder.Default
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeStep> steps = new ArrayList<>();
}
