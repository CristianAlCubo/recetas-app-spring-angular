import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  searchQuery: string = '';
  selectedCategory: string | null = null;

  onSearch = output<string>();
  onFilterChange = output<string | null>();

  onSearchClick() {
    this.onSearch.emit(this.searchQuery);
  }

  filterByCategory(category: string | null) {
    this.selectedCategory = category;
    this.onFilterChange.emit(category);
  }

  isActive(category: string | null): boolean {
    return this.selectedCategory === category;
  }
}
