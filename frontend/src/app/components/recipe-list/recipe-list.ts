import { Component, inject, Signal, signal } from '@angular/core';
import { RecipeService } from '../../services/recipe-service';
import { Recipe } from '../../types/recipe';
import { RecipeCard } from "../recipe-card/recipe-card";

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCard],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {

  protected recipeService = inject(RecipeService);
  protected recipes = signal<Recipe[]>([]);
  ngAfterViewInit() {
    console.log("RecipeList ngAfterViewInit");
    this.recipeService.getRecipes().subscribe({ next: (response) => {
      this.recipes.set(response.data);
    }, error: (error) => {
      console.error("Error:", error);
    } });
  }

}
