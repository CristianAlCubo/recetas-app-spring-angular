package com.ccubillos.recetas_app.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    public RecipeIngredient(String name, Recipe recipe) {
        this.name = name;
        this.recipe = recipe;
    }
}
