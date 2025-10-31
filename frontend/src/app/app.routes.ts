import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth-guard';
import { RecipeDetailsPage } from './pages/recipe-details-page/recipe-details-page';
import { RecipeCreatePage } from './pages/recipe-create-page/recipe-create-page';
import { RecipeEditPage } from './pages/recipe-edit-page/recipe-edit-page';
export const routes: Routes = [
  { path: '', component: Home, canActivate: [authGuard] },
  { path: 'recipe/new', component: RecipeCreatePage, canActivate: [authGuard] },
  { path: 'recipe/edit/:id', component: RecipeEditPage, canActivate: [authGuard] },
  { path: 'recipe/:id', component: RecipeDetailsPage, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
