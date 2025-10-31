import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth-guard';
import { Recipe } from './pages/recipe/recipe';

export const routes: Routes = [
    { path: '', component: Home, canActivate: [authGuard] },
    { path: 'recipe/:id', component: Recipe, canActivate: [authGuard] },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
];
