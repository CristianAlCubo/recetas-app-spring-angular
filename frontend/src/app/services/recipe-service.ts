import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ApiResponse } from '../types/api';
import { Observable, throwError } from 'rxjs';
import { CreateRecipe, Recipe } from '../types/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private API_URL =
    environment.API_HOST && environment.API_PORT
      ? `http://${environment.API_HOST}:${environment.API_PORT}/api/${environment.API_VERSION}/recipe`
      : `/api/${environment.API_VERSION}/recipe`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<ApiResponse<Recipe[]>> {
    return this.http.get<ApiResponse<Recipe[]>>(`${this.API_URL}`, { headers: this.headers }).pipe(
      tap((response: ApiResponse<Recipe[]>) => {
        return response.data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getRecipe(id: number): Observable<ApiResponse<Recipe>> {
    return this.http
      .get<ApiResponse<Recipe>>(`${this.API_URL}/${id}`, { headers: this.headers })
      .pipe(
        tap((response: ApiResponse<Recipe>) => {
          return response.data;
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  createRecipe(recipe: CreateRecipe): Observable<ApiResponse<Recipe>> {
    return this.http
      .post<ApiResponse<Recipe>>(`${this.API_URL}`, recipe, { headers: this.headers })
      .pipe(
        tap((response: ApiResponse<Recipe>) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  updateRecipe(id: number, recipe: CreateRecipe): Observable<ApiResponse<Recipe>> {
    return this.http
      .put<ApiResponse<Recipe>>(`${this.API_URL}/${id}`, recipe, { headers: this.headers })
      .pipe(
        tap((response: ApiResponse<Recipe>) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  deleteRecipe(id: number): Observable<ApiResponse<Recipe[]>> {
    return this.http.delete<ApiResponse<Recipe[]>>(`${this.API_URL}/${id}`, {
      headers: this.headers,
    });
  }
}
