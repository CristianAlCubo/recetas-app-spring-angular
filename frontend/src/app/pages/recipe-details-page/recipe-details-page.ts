import { Component, inject, signal } from '@angular/core';
import { RecipeDetails } from '../../components/recipes/recipe-details/recipe-details';
import { RecipeService } from '../../services/recipe-service';
import { Recipe as RecipeType } from '../../types/recipe';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-details-page',
  imports: [RecipeDetails, RouterLink],
  templateUrl: './recipe-details-page.html',
  styleUrl: './recipe-details-page.css',
})
export class RecipeDetailsPage {
  protected recipeService = inject(RecipeService);
  protected recipe = signal<RecipeType | null>(null);
  protected route = inject(ActivatedRoute);
  ngOnInit() {
    this.recipeService.getRecipe(this.route.snapshot.params['id']).subscribe({
      next: (response) => {
        this.recipe.set(response.data);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
