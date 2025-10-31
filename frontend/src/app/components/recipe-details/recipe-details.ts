import { Component, input } from '@angular/core';
import { Recipe } from '../../types/recipe';;
import { ExportRecipeButton } from "../export-recipe-button/export-recipe-button";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-recipe-details',
  imports: [ExportRecipeButton, Footer],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css',
})
export class RecipeDetails {

  recipe = input.required<Recipe>();
}
