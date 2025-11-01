import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login, Register, TokenResponse } from '../types/auth';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiResponse } from '../types/api';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL =
    environment.API_HOST && environment.API_PORT
      ? `http://${environment.API_HOST}:${environment.API_PORT}/api/${environment.API_VERSION}/auth`
      : `/api/${environment.API_VERSION}/auth`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private router: Router) { }

  login(login: Login): Observable<ApiResponse<TokenResponse>> {
    return this.http
      .post<ApiResponse<TokenResponse>>(`${this.API_URL}/login`, login, { headers: this.headers })
      .pipe(
        tap(({ data }) => localStorage.setItem('access_token', data.token)),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  register(register: Register): Observable<ApiResponse<TokenResponse>> {
    return this.http
      .post<ApiResponse<TokenResponse>>(
        `${this.API_URL}/register`,
        {
          username: register.username,
          password: register.password,
        },
        { headers: this.headers }
      )
      .pipe(
        tap(({ data }) => localStorage.setItem('access_token', data.token)),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  checkTokenExpiration() {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtDecode<{ exp: number }>(token);
      if (decodedToken.exp < Date.now() / 1000) {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
      }
    }
  }
}
