import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeForm } from '../../components/recipes/recipe-form/recipe-form';
import { CreateRecipe } from '../../types/recipe';
import { RecipeService } from '../../services/recipe-service';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-recipe-create-page',
  standalone: true,
  imports: [RecipeForm, Footer],
  templateUrl: './recipe-create-page.html',
  styleUrl: './recipe-create-page.css',
})
export class RecipeCreatePage {
  private router = inject(Router);
  private recipeService = inject(RecipeService);

  handleSubmit(recipeData: CreateRecipe): void {
    this.recipeService.createRecipe(recipeData).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al crear la receta:', error);
      },
    });
  }

  handleCancel(): void {
    this.router.navigate(['/']);
  }
}
