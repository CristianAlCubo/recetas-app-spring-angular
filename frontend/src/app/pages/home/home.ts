import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { RecipeList } from '../../components/recipes/recipe-list/recipe-list';
import { Menu } from '../../components/menu/menu';
import { Footer } from '../../components/footer/footer';
import { Recipe } from '../../types/recipe';
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
  searchQuery: string = '';
  selectedCategory: string | null = null;
  recipes = signal<Recipe[]>([]);

  protected recipeService = inject(RecipeService);

  ngAfterViewInit() {
    this.recipeService.getRecipes().subscribe({
      next: (response) => {
        this.recipes.set(response.data);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  handleSearch(query: string) {
    this.searchQuery = query;
    console.log('Buscando:', query);
    // Implementar lógica de búsqueda aquí
  }

  handleFilterChange(category: string | null) {
    this.selectedCategory = category;
    console.log('Filtro:', category);
    // Implementar lógica de filtrado aquí
  }
}
