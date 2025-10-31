import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RecipeCategory, CategoryLabels } from '../../types/recipe';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  searchQuery: string = '';
  selectedCategory: RecipeCategory | null = null;

  categories = Object.values(RecipeCategory);
  categoryLabels = CategoryLabels;

  onSearch = output<string>();
  onFilterChange = output<RecipeCategory | null>();

  onSearchChange() {
    this.onSearch.emit(this.searchQuery);
  }

  filterByCategory(category: RecipeCategory | null) {
    this.selectedCategory = category;
    this.onFilterChange.emit(category);
  }

  isActive(category: RecipeCategory | null): boolean {
    return this.selectedCategory === category;
  }
}
