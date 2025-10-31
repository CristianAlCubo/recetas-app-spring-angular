export enum RecipeDifficulty {
    EASY = 'Fácil',
    MEDIUM = 'Media',
    HARD = 'Difícil',
}

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

export interface RecipeStep{
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
