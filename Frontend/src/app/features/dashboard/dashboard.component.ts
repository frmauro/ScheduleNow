import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterModule],
  template: `
    <div class="flex h-screen bg-slate-50">
      <app-sidebar></app-sidebar>
      <main class="flex-1 overflow-y-auto p-10">
        <header class="mb-10 flex justify-between items-end">
          <div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
            <p class="text-slate-500 mt-1">Bem-vindo ao seu painel de controle</p>
          </div>
          <div class="text-right">
             <span class="text-sm font-bold text-slate-400 uppercase tracking-widest">{{ today | date:'fullDate':'':'pt-BR' }}</span>
          </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 font-bold text-xl uppercase">A</div>
            <p class="text-slate-500 text-sm font-medium">Agendamentos Hoje</p>
            <h2 class="text-3xl font-black text-slate-900 mt-1">12</h2>
          </div>
          <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
             <div class="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 font-bold text-xl uppercase">R</div>
            <p class="text-slate-500 text-sm font-medium">Receita Estimada</p>
            <h2 class="text-3xl font-black text-slate-900 mt-1">R$ 1.250</h2>
          </div>
          <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
             <div class="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 font-bold text-xl uppercase">F</div>
            <p class="text-slate-500 text-sm font-medium">Funcionários Ativos</p>
            <h2 class="text-3xl font-black text-slate-900 mt-1">4</h2>
          </div>
          <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
             <div class="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-4 font-bold text-xl uppercase">C</div>
            <p class="text-slate-500 text-sm font-medium">Novos Clientes</p>
            <h2 class="text-3xl font-black text-slate-900 mt-1">8</h2>
          </div>
        </div>

        <section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
            <h3 class="text-xl font-bold text-slate-900 mb-6">Próximos Agendamentos</h3>
            <div class="space-y-4">
               <div *ngFor="let i of [1,2,3]" class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                  <div class="flex items-center gap-4">
                     <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-200 font-bold text-indigo-600">JS</div>
                     <div>
                        <p class="text-sm font-bold text-slate-900">João Silva</p>
                        <p class="text-xs text-slate-500">Corte de Cabelo Masculino</p>
                     </div>
                  </div>
                  <div class="text-right">
                     <p class="text-sm font-bold text-slate-900">14:00</p>
                     <p class="text-xs text-indigo-600 font-medium">Confirmado</p>
                  </div>
               </div>
            </div>
          </div>
          
          <div class="bg-indigo-600 rounded-3xl shadow-2xl shadow-indigo-200 p-8 text-white flex flex-col justify-between">
            <div>
              <h3 class="text-2xl font-black mb-4">Link de Agendamento</h3>
              <p class="text-indigo-100 text-sm leading-relaxed mb-6">Compartilhe este link com seus clientes para que eles possam agendar online.</p>
              <div class="bg-white/10 p-3 rounded-xl border border-white/20 text-xs font-mono break-all mb-4">
                schedulemow.com/seu-negocio
              </div>
            </div>
            <button class="bg-white text-indigo-600 font-bold py-3 px-6 rounded-2xl hover:bg-indigo-50 transition-colors active:scale-95">
              Copiar Link
            </button>
          </div>
        </section>
      </main>
    </div>
  `
})
export class DashboardComponent {
  today = new Date();
}
