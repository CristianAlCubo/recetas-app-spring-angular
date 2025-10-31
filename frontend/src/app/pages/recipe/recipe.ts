import { Component, inject, signal } from '@angular/core';
import { RecipeDetails } from "../../components/recipe-details/recipe-details";
import { RecipeService } from "../../services/recipe-service";
import { Recipe as RecipeType } from '../../types/recipe';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe',
  imports: [RecipeDetails, RouterLink],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class Recipe {

  protected recipeService = inject(RecipeService);
  protected recipe = signal<RecipeType | null>(null);
  protected route = inject(ActivatedRoute);
  ngOnInit() {
    this.recipeService.getRecipe(this.route.snapshot.params['id']).subscribe({
      next: (response) => {
        this.recipe.set(response.data);
      },
      error: (error) => {
        console.error("Error:", error);
      }
    });
  }
}
