import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth-guard';
import { RecipeDetailsPage } from './pages/recipe-details-page/recipe-details-page';
import { RecipeCreatePage } from './pages/recipe-create-page/recipe-create-page';
import { RecipeEditPage } from './pages/recipe-edit-page/recipe-edit-page';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: Home },
      {
        path: 'recipe',
        children: [
          { path: 'new', component: RecipeCreatePage },
          { path: 'edit/:id', component: RecipeEditPage },
          { path: ':id', component: RecipeDetailsPage },
        ],
      },
    ],
  },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Manejo de rutas no encontradas
];
