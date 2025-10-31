import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryLabels, Recipe, RecipeCategory } from '../../../types/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {
  recipe = input.required<Recipe>();
  router = inject(Router);
  categoryLabels = CategoryLabels;

  getCategoryBadgeClass(): string {
    const categoryClasses: { [key: string]: string } = {
      [RecipeCategory.BREAKFAST]: 'bg-warning text-dark',
      [RecipeCategory.LUNCH]: 'bg-success text-dark',
      [RecipeCategory.DINNER]: 'bg-danger text-dark',
      [RecipeCategory.SNACK]: 'bg-info text-dark',
      [RecipeCategory.DESSERT]: 'bg-danger text-dark',
      [RecipeCategory.BEVERAGE]: 'bg-primary text-dark',
    };
    console.log('Category:', this.recipe().category);
    console.log('ClassName:', categoryClasses[this.recipe().category]);
    return categoryClasses[this.recipe().category];
  }

  navigateToRecipeDetails() {
    this.router.navigate(['/recipe', this.recipe().id]);
  }
}
