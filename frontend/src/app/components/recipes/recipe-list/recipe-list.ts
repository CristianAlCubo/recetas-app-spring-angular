import { Component, input } from '@angular/core';
import { Recipe } from '../../../types/recipe';
import { RecipeCard } from '../recipe-card/recipe-card';
import { RouterLink } from '@angular/router';

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
}
