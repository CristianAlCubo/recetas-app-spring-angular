import { Component, inject, input } from '@angular/core';
import { PDFService } from '../../../services/pdfservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-export-recipe-button',
  imports: [CommonModule],
  templateUrl: './export-recipe-button.html',
  styleUrl: './export-recipe-button.css',
})
export class ExportRecipeButton {
  recipeId = input.required<number>();
  pdfService = inject(PDFService);
  isLoading = false;

  exportRecipes() {
    this.isLoading = true;
    this.pdfService.exportRecipePDF(this.recipeId()).subscribe({
      next: (response) => {
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error exporting recipe:', error);
        this.isLoading = false;
      },
    });
  }
}
