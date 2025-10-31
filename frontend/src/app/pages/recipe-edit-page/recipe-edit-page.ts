import { Component, inject, signal } from '@angular/core';
import { RecipeService } from '../../services/recipe-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateRecipe, Recipe } from '../../types/recipe';
import { RecipeForm } from '../../components/recipes/recipe-form/recipe-form';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-recipe-edit-page',
  imports: [RecipeForm, Footer],
  templateUrl: './recipe-edit-page.html',
  styleUrl: './recipe-edit-page.css',
})
export class RecipeEditPage {
  protected recipeService = inject(RecipeService);
  protected route = inject(ActivatedRoute);
  protected recipe = signal<Recipe | null>(null);
  protected router = inject(Router);

  constructor() {
    this.recipeService.getRecipe(Number(this.route.snapshot.params['id'])).subscribe({
      next: (response) => {
        this.recipe.set(response.data);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  handleSubmit(recipeData: CreateRecipe): void {
    this.recipeService
      .updateRecipe(Number(this.route.snapshot.params['id']), recipeData)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/recipe', response.data.id]);
        },
      });
  }

  handleCancel(): void {
    this.router.navigate(['/recipe', this.recipe()?.id]);
  }
}
