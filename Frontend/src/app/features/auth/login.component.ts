import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent, InputComponent, CardComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10"></div>
      
      <div class="w-full max-w-md">
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-3xl shadow-2xl shadow-indigo-200 mb-6 rotate-3">
             <span class="text-white text-3xl font-black">SN</span>
          </div>
          <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">Bem-vindo de volta</h1>
          <p class="text-slate-500 mt-2">Acesse sua conta para gerenciar sua agenda</p>
        </div>

        <app-card>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <app-input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              formControlName="email"
              [error]="getEmailError()"
            ></app-input>

            <app-input
              label="Senha"
              type="password"
              placeholder="••••••••"
              formControlName="password"
              [error]="getPasswordError()"
            ></app-input>

            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center text-slate-600 cursor-pointer">
                <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mr-2">
                Lembrar de mim
              </label>
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Esqueceu a senha?</a>
            </div>

            <app-button 
              type="submit" 
              class="w-full" 
              size="lg"
              [loading]="loading"
              [disabled]="loginForm.invalid"
            >
              Entrar
            </app-button>

            <div *ngIf="errorMessage" class="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center">
              {{ errorMessage }}
            </div>
          </form>
        </app-card>

        <p class="text-center mt-8 text-slate-600">
          Não tem uma conta? 
          <a routerLink="/register" class="font-bold text-indigo-600 hover:text-indigo-500">Criar agora</a>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'E-mail ou senha inválidos.';
        this.loading = false;
      }
    });
  }

  getEmailError(): string | null {
    const control = this.loginForm.get('email');
    if (control?.touched && control.errors) {
      if (control.errors['required']) return 'E-mail é obrigatório';
      if (control.errors['email']) return 'E-mail inválido';
    }
    return null;
  }

  getPasswordError(): string | null {
    const control = this.loginForm.get('password');
    if (control?.touched && control.errors) {
      if (control.errors['required']) return 'Senha é obrigatória';
      if (control.errors['minlength']) return 'Mínimo de 6 caracteres';
    }
    return null;
  }
}
