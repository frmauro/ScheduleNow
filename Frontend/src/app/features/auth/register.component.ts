import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent, InputComponent, CardComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10"></div>
      
      <div class="w-full max-w-md">
        <div class="text-center mb-10">
          <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">Comece agora</h1>
          <p class="text-slate-500 mt-2">Crie sua conta para automatizar seus agendamentos</p>
        </div>

        <app-card>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-5">
            <app-input
              label="Nome Completo"
              placeholder="João Silva"
              formControlName="name"
              [error]="getError('name')"
            ></app-input>

            <app-input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              formControlName="email"
              [error]="getError('email')"
            ></app-input>

            <app-input
              label="Senha"
              type="password"
              placeholder="••••••••"
              formControlName="password"
              [error]="getError('password')"
            ></app-input>

            <app-button 
              type="submit" 
              class="w-full mt-4" 
              size="lg"
              [loading]="loading"
              [disabled]="registerForm.invalid"
            >
              Criar Conta
            </app-button>

            <div *ngIf="errorMessage" class="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center">
              {{ errorMessage }}
            </div>
          </form>
        </app-card>

        <p class="text-center mt-8 text-slate-600">
          Já tem uma conta? 
          <a routerLink="/login" class="font-bold text-indigo-600 hover:text-indigo-500">Fazer login</a>
        </p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Erro ao criar conta. Tente novamente.';
        this.loading = false;
      }
    });
  }

  getError(field: string): string | null {
    const control = this.registerForm.get(field);
    if (control?.touched && control.errors) {
      if (control.errors['required']) return 'Campo obrigatório';
      if (control.errors['email']) return 'E-mail inválido';
      if (control.errors['minlength']) return `Mínimo de ${control.errors['minlength'].requiredLength} caracteres`;
    }
    return null;
  }
}
