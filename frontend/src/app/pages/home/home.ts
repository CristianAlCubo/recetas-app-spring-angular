import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { RecipeList } from '../../components/recipe-list/recipe-list';
import { Menu } from '../../components/menu/menu';
import { Footer } from '../../components/footer/footer';

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
