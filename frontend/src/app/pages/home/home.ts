import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { RecipeList } from '../../components/recipes/recipe-list/recipe-list';
import { Menu } from '../../components/menu/menu';
import { Footer } from '../../components/footer/footer';
import { Recipe, RecipeCategory } from '../../types/recipe';
import { RecipeService } from '../../services/recipe-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipeList, CommonModule, FormsModule, Menu, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected authService = inject(AuthService);
  protected recipeService = inject(RecipeService);

  searchQuery = signal<string>('');
  selectedCategory = signal<RecipeCategory | null>(null);
  allRecipes = signal<Recipe[]>([]);

  filteredRecipes = computed(() => {
    const recipes = this.allRecipes();
    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    let filtered = recipes;

    if (category) {
      filtered = filtered.filter((recipe) => recipe.category === category);
    }

    if (query) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(query))
      );
    }

    return filtered;
  });

  hasFiltersApplied = computed(() => {
    return this.selectedCategory() !== null || this.searchQuery().trim() !== '';
  });

  ngAfterViewInit() {
    this.recipeService.getRecipes().subscribe({
      next: (response) => {
        this.allRecipes.set(response.data);
      },
      error: (error) => {
        console.error('Error al cargar recetas:', error);
      },
    });
  }

  handleSearch(query: string) {
    this.searchQuery.set(query);
  }

  handleFilterChange(category: RecipeCategory | null) {
    this.selectedCategory.set(category);
  }
}
