import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ButtonComponent],
  template: `
    <div class="flex h-screen bg-slate-50">
      <app-sidebar></app-sidebar>
      <main class="flex-1 overflow-y-auto p-10">
        <header class="mb-10 flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Funcionários</h1>
            <p class="text-slate-500 mt-1">Gerencie sua equipe e permissões</p>
          </div>
          <app-button variant="primary" size="md">
            + Novo Funcionário
          </app-button>
        </header>

        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/50 border-b border-slate-100">
                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Funcioário</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Cargo</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let emp of employees" class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center font-bold text-indigo-600">
                      {{ emp.name.charAt(0) }}
                    </div>
                    <div>
                      <p class="text-sm font-bold text-slate-900">{{ emp.name }}</p>
                      <p class="text-xs text-slate-500">{{ emp.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600 font-medium">{{ emp.role }}</td>
                <td class="px-6 py-4">
                  <span class="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider"
                        [ngClass]="emp.active ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'">
                    {{ emp.active ? 'Ativo' : 'Inativo' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <button class="text-slate-400 hover:text-indigo-600 transition-colors mr-3 font-bold text-xs uppercase tracking-widest">Editar</button>
                  <button class="text-slate-400 hover:text-red-600 transition-colors font-bold text-xs uppercase tracking-widest">Remover</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `
})
export class EmployeesComponent {
  employees = [
    { name: 'John Doe', email: 'john@example.com', role: 'Gerente', active: true },
    { name: 'Sarah Connor', email: 'sarah@example.com', role: 'Especialista', active: true },
    { name: 'Kyle Reese', email: 'kyle@example.com', role: 'Atendente', active: false },
  ];
}
