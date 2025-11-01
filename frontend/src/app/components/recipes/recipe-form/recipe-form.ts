import { Component, OnInit, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Recipe, RecipeCategory, RecipeDifficulty, CreateRecipe } from '../../../types/recipe';
import { DynamicListInput } from '../../dynamic-list-input/dynamic-list-input';
import { CategoryLabels, DifficultyLabels } from '../../../types/recipe';

export type FormMode = 'create' | 'update';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicListInput],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.css',
})
export class RecipeForm implements OnInit {
  mode = input<FormMode>('create');
  recipe = input<Recipe | null>(null);

  onSubmitForm = output<CreateRecipe>();
  onCancel = output<void>();

  recipeForm!: FormGroup;
  submitted = false;

  categories = Object.values(RecipeCategory);
  categoryLabels = CategoryLabels;
  difficulties = Object.values(RecipeDifficulty);
  difficultyLabels = DifficultyLabels;

  constructor(private fb: FormBuilder) {
    effect(() => {
      const currentRecipe = this.recipe();
      if (currentRecipe && this.mode() === 'update') {
        this.loadRecipeData(currentRecipe);
      }
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      category: ['', Validators.required],
      difficulty: ['', Validators.required],
      preparationTime: ['', [Validators.required, Validators.min(1), Validators.max(1440)]],
      cookTime: ['', [Validators.required, Validators.min(0), Validators.max(1440)]],
      servings: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      ingredients: [[]],
      steps: [[]],
    });
  }

  private loadRecipeData(recipe: Recipe): void {
    const ingredientsList = recipe.ingredients.map((ing) => ing.name);
    const stepsList = recipe.steps.map((step) => step.description);

    this.recipeForm.patchValue({
      name: recipe.name,
      description: recipe.description,
      category: recipe.category,
      difficulty: recipe.difficulty,
      preparationTime: recipe.preparationTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      ingredients: ingredientsList,
      steps: stepsList,
    });
  }

  get f() {
    return this.recipeForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.recipeForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.recipeForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Este campo es obligatorio';
    if (field.errors['minlength']) {
      return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    }
    if (field.errors['maxlength']) {
      return `Máximo ${field.errors['maxlength'].requiredLength} caracteres`;
    }
    if (field.errors['min']) {
      return `El valor mínimo es ${field.errors['min'].min}`;
    }
    if (field.errors['max']) {
      return `El valor máximo es ${field.errors['max'].max}`;
    }

    return 'Campo inválido';
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.recipeForm.invalid) {
      Object.keys(this.recipeForm.controls).forEach((key) => {
        const control = this.recipeForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    const formValue = this.recipeForm.value;
    this.onSubmitForm.emit(formValue);
  }

  handleCancel(): void {
    this.onCancel.emit();
  }

  onReset(): void {
    this.submitted = false;
    this.recipeForm.reset();
  }

  isUpdateMode(): boolean {
    return this.mode() === 'update';
  }

  getFormTitle(): string {
    return this.isUpdateMode() ? 'Editar Receta' : 'Crear Nueva Receta';
  }

  getSubmitButtonText(): string {
    return this.isUpdateMode() ? 'Actualizar receta' : 'Guardar receta';
  }
}
