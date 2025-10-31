import { Component, inject, input, signal } from '@angular/core';
import { RecipeService } from '../../../services/recipe-service';
import { Recipe } from '../../../types/recipe';
import { RecipeCard } from '../recipe-card/recipe-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCard, RouterLink],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected recipeService = inject(RecipeService);
  recipes = input.required<Recipe[]>();
}
