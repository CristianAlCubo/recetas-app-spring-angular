import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { RecipeList } from '../../components/recipes/recipe-list/recipe-list';
import { Menu } from '../../components/menu/menu';
import { Footer } from '../../components/footer/footer';
import { Recipe, RecipeCategory, RecipeDifficulty } from '../../types/recipe';
import { RecipeService } from '../../services/recipe-service';
import { Router } from '@angular/router';

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
  protected router = inject(Router);
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

  loadDefaultRecipe() {
    this.recipeService
      .createRecipe({
        name: 'Bandeja Paisa',
        description:
          'La Bandeja Paisa es una receta típica colombiana que se prepara con una variedad de ingredientes como carne, arroz, huevos, plátano, aguacate, leche y frijoles. Se sirve en una bandeja con todos estos ingredientes y se acompaña con arepas o pan. Es una receta rica y completa que se disfruta en familia o en reuniones.',
        category: RecipeCategory.LUNCH,
        preparationTime: 30,
        cookTime: 90,
        difficulty: RecipeDifficulty.MEDIUM,
        servings: 4,
        ingredients: [
          '2 tazas de fríjoles rojos (remojados la noche anterior)',
          '4 tazas de agua (para cocer los fríjoles)',
          '2 tazas de arroz blanco',
          '500 g de carne molida de res',
          '300 g de chicharrón (tocino frito o panceta carnosa)',
          '4 chorizos colombianos',
          '4 huevos',
          '2 plátanos maduros, cortados en rodajas y fritos',
          '4 arepas antioqueñas (o de maíz blanco)',
          '1 aguacate grande, en rodajas',
          'Hogao: 1 cebolla grande picada + 2 tomates maduros picados + 2 dientes de ajo picados',
          'Aceite para freír',
          'Sal y pimienta al gusto',
        ],
        steps: [
          'Remoja los fríjoles la noche anterior en agua. Al día siguiente, escúrrelos y cocínalos con las 4 tazas de agua, sal al gusto, a fuego medio-bajo hasta que queden tiernos (aprox. 1 h 30).',
          'Prepara el hogao: en una sartén con un poco de aceite sofríe la cebolla picada, el tomate y el ajo hasta que estén blandos y formen una salsa. Reserva.',
          'Cocina el arroz blanco: lava el arroz, ponlo con 1 parte de arroz por 2 partes de agua, sal al gusto, tapa y cocina hasta que el agua se absorba y el arroz esté listo.',
          'Cocina la carne molida: en una sartén caliente con un poco de aceite, cocina la carne molida sazonada con sal y pimienta hasta que esté dorada y cocida.',
          'Fríe el chicharrón: corta la panceta o el tocino en trozos, fríelos en aceite caliente hasta que queden crujientes. Retira y coloca sobre papel absorbente.',
          'Fríe los chorizos en otra sartén hasta que estén bien dorados por fuera.',
          'Fríe los plátanos maduros: pela los plátanos, córtalos en rodajas diagonales y fríelos en aceite hasta que estén dorados-caramelizados. Reserva.',
          'Fríe los huevos: en una sartén con un poco de aceite caliente, fríe cada huevo hasta que las claras estén cocidas y la yema al gusto.',
          'Calienta las arepas: en una plancha o sartén caliente, dora las arepas ligeramente por ambos lados.',
          'Montaje: en 4 bandejas amplias (o platos grandes) sirve por cada porción: un cucharón de fríjoles, una porción de arroz, la carne molida, el chicharrón, un chorizo, un huevo frito, una o dos rodajas de plátano maduro, una arepa y rodajas de aguacate. Añade un poco de hogao sobre los fríjoles o la carne para dar sabor.',
          'Sirve inmediatamente y disfruta.',
        ],
      })
      .subscribe({
        next: (response) => {
          this.allRecipes.set([...this.allRecipes(), response.data]);
        },
      });
  }
}
