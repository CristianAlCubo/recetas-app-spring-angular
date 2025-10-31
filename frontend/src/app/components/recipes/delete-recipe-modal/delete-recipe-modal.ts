import { Component, inject, input, signal, viewChild } from '@angular/core';
import { Modal } from '../../modal/modal';
import { RecipeService } from '../../../services/recipe-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-recipe-modal',
  imports: [Modal],
  templateUrl: './delete-recipe-modal.html',
  styleUrl: './delete-recipe-modal.css',
})
export class DeleteRecipeModal {
  recipeService = inject(RecipeService);
  deleteModal = viewChild<Modal>('deleteModal');
  recipeId = input.required<number>();
  router = inject(Router);

  openDeleteModal() {
    const modal = this.deleteModal();
    if (!modal) return;

    modal.show();
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId()).subscribe({
      next: (response) => {
        if (response.statusCode === 200 && response.success) {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Error deleting recipe:', error);
      },
    });
  }

  cancelDelete() {}
}
