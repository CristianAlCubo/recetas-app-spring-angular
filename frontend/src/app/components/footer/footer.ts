import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected authService = inject(AuthService);
  currentYear = new Date().getFullYear();

  logout() {
    this.authService.logout();
  }
}
