package com.ccubillos.recetas_app.repository;

import com.ccubillos.recetas_app.model.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    Optional<List<Recipe>> findAllByUserUsername(String username);
}

