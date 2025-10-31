import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');
  const errorScenarios = ['Expired token', 'No token provided', 'Invalid token'];

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el backend devolvió un cuerpo tipo HTTPAPISingleResponse
      const response = error.error;

      if (response?.message) {
        console.error('API Error:', response.message);
      }

      // Casos típicos de error que involucran eliminar el token y redirigir al login
      if (errorScenarios.includes(response?.message)) {
        localStorage.removeItem('access_token');
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
