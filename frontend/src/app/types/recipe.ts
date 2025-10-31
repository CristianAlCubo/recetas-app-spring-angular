export enum RecipeDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export const DifficultyLabels: Record<RecipeDifficulty, string> = {
  [RecipeDifficulty.EASY]: 'Fácil',
  [RecipeDifficulty.MEDIUM]: 'Media',
  [RecipeDifficulty.HARD]: 'Difícil',
};

export enum RecipeCategory {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
  SNACK = 'SNACK',
  DESSERT = 'DESSERT',
  BEVERAGE = 'BEVERAGE',
}

export const CategoryLabels: Record<RecipeCategory, string> = {
  [RecipeCategory.BREAKFAST]: 'Desayuno',
  [RecipeCategory.LUNCH]: 'Almuerzo',
  [RecipeCategory.DINNER]: 'Cena',
  [RecipeCategory.SNACK]: 'Snack',
  [RecipeCategory.DESSERT]: 'Postre',
  [RecipeCategory.BEVERAGE]: 'Bebida',
};

export interface RecipeIngredient {
  id: number;
  name: string;
}

export interface RecipeStep {
  id: number;
  description: string;
}

export interface Recipe {
  id: number;
  name: string;
  imgUrl: string;
  description: string;
  category: RecipeCategory;
  preparationTime: number;
  cookTime: number;
  difficulty: RecipeDifficulty;
  servings: number;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
}

export interface CreateRecipe {
  name: string;
  description: string;
  category: RecipeCategory;
  preparationTime: number;
  cookTime: number;
  difficulty: RecipeDifficulty;
  servings: number;
  ingredients: string[];
  steps: string[];
}
