import { Injectable } from '@angular/core';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class AuthInitService {
  constructor(private authService: AuthService) {}

  initApp(): void {
    this.authService.checkTokenExpiration();
  }
}
