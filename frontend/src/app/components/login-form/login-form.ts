import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  hidePassword = true;

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.loginForm.setErrors({ 'invalidCredentials': true });
      }
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
