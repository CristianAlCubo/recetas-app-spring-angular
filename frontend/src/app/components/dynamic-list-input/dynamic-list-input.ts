import { Component, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

interface ListItem {
  id: string;
  value: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-dynamic-list-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-list-input.html',
  styleUrl: './dynamic-list-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicListInput),
      multi: true,
    },
  ],
})
export class DynamicListInput implements ControlValueAccessor {
  items = signal<ListItem[]>([]);
  newItemValue = signal('');

  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string[]): void {
    if (value && Array.isArray(value)) {
      this.items.set(
        value.map((v, index) => ({
          id: `item-${Date.now()}-${index}`,
          value: v,
          isEditing: false,
        }))
      );
    } else {
      this.items.set([]);
    }
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  addItem(): void {
    const value = this.newItemValue().trim();
    if (!value) return;

    const newItem: ListItem = {
      id: `item-${Date.now()}`,
      value: value,
      isEditing: false,
    };

    this.items.update((items) => [...items, newItem]);
    this.newItemValue.set('');
    this.emitChange();
  }

  removeItem(id: string): void {
    this.items.update((items) => items.filter((item) => item.id !== id));
    this.emitChange();
  }

  startEdit(id: string): void {
    this.items.update((items) =>
      items.map((item) => ({
        ...item,
        isEditing: item.id === id,
      }))
    );
  }

  saveEdit(id: string, newValue: string): void {
    const trimmedValue = newValue.trim();
    if (!trimmedValue) {
      this.removeItem(id);
      return;
    }

    this.items.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, value: trimmedValue, isEditing: false } : item
      )
    );
    this.emitChange();
  }

  cancelEdit(id: string): void {
    this.items.update((items) =>
      items.map((item) => ({
        ...item,
        isEditing: false,
      }))
    );
  }

  private emitChange(): void {
    const values = this.items().map((item) => item.value);
    this.onChange(values);
    this.onTouched();
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addItem();
    }
  }

  handleEditKeydown(event: KeyboardEvent, id: string, value: string): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.saveEdit(id, value);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelEdit(id);
    }
  }
}
