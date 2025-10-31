import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  hidePassword = true;
  hidePasswordConfirmation = true;

  registerForm: FormGroup = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(1)]],
    },
    { validators: this.passwordMatchValidator.bind(this) }
  );

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirmation = control.get('passwordConfirmation')?.value;

    const passwordConfirmationControl = control.get('passwordConfirmation');

    if (password && passwordConfirmation && password !== passwordConfirmation) {
      passwordConfirmationControl?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      if (passwordConfirmationControl?.hasError('mismatch')) {
        passwordConfirmationControl.setErrors(null);
      }
      return null;
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.registerForm.get('username')?.setErrors({ usernameInUse: true });
        } else {
          console.error('An unexpected error occurred:', err);
        }
      },
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  togglePasswordConfirmationVisibility() {
    this.hidePasswordConfirmation = !this.hidePasswordConfirmation;
  }
}
