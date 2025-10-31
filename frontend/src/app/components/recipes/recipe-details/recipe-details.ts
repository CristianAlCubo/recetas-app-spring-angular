import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../types/recipe';
import { ExportRecipeButton } from '../export-recipe-button/export-recipe-button';
import { Footer } from '../../footer/footer';
import { DeleteRecipeModal } from '../delete-recipe-modal/delete-recipe-modal';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [ExportRecipeButton, Footer, CommonModule, DeleteRecipeModal, RouterLink],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css',
})
export class RecipeDetails {
  recipe = input.required<Recipe>();
}
