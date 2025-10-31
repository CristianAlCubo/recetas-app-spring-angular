import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PDFService {
  
  private API_URL = `http://${environment.API_HOST}:${environment.API_PORT}/api/${environment.API_VERSION}/pdf-recipe`;
  private http = inject(HttpClient);

  exportRecipePDF(recipeId: number): Observable<Blob> {
    return this.http.get(`${this.API_URL}/${recipeId}`, { 
      responseType: 'blob'
    }).pipe(
      tap((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `recipe-${recipeId}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
