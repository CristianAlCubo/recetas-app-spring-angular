import { Component, inject, input } from '@angular/core';
import { PDFService } from '../../services/pdfservice';

@Component({
  selector: 'app-export-recipe-button',
  imports: [],
  templateUrl: './export-recipe-button.html',
  styleUrl: './export-recipe-button.css',
})
export class ExportRecipeButton {
  
  recipeId = input.required<number>();
  pdfService = inject(PDFService);

  exportRecipes() {
    console.log("Exporting recipe:", this.recipeId());
    this.pdfService.exportRecipePDF(this.recipeId()).subscribe({
      next: (response) => {
        console.log("Recipe exported:", response);
      },
      error: (error) => {
        console.error("Error exporting recipe:", error);
      }
    });
  }
}
