package com.ccubillos.recetas_app.repository;

import com.ccubillos.recetas_app.model.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> { }
