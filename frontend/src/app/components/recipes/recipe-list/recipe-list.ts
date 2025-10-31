import { Component, inject, input, output } from '@angular/core';
import { Recipe, RecipeCategory, RecipeDifficulty } from '../../../types/recipe';
import { RecipeCard } from '../recipe-card/recipe-card';
import { Router, RouterLink } from '@angular/router';
import { RecipeService } from '../../../services/recipe-service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeCard, RouterLink],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  recipes = input.required<Recipe[]>();
  hasFiltersApplied = input<boolean>(false);

  loadDefaultRecipe = output<void>();

  protected recipeService = inject(RecipeService);
  protected router = inject(Router);

  handleLoadDefaultRecipe() {
    this.loadDefaultRecipe.emit();
  }
}
