import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ButtonComponent],
  template: `
    <div class="flex h-screen bg-slate-50">
      <app-sidebar></app-sidebar>
      <main class="flex-1 overflow-y-auto p-10">
        <header class="mb-10 flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Serviços</h1>
            <p class="text-slate-500 mt-1">Configure o que o seu negócio oferece</p>
          </div>
          <app-button variant="primary" size="md">
            + Novo Serviço
          </app-button>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let svc of services" class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div class="flex justify-between items-start mb-4">
              <div class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <i class="lucide-scissors w-6 h-6"></i>
              </div>
              <span class="text-xs font-bold text-slate-400 border border-slate-100 px-2 py-1 rounded-lg">{{ svc.duration }} min</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900">{{ svc.name }}</h3>
            <p class="text-slate-500 text-sm mt-1 line-clamp-2 h-10">{{ svc.description }}</p>
            <div class="mt-6 flex justify-between items-center pt-6 border-t border-slate-50">
               <span class="text-2xl font-black text-slate-900">R$ {{ svc.price }}</span>
               <div class="flex gap-2">
                 <button class="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-colors">
                    <i class="lucide-pencil w-4 h-4"></i>
                 </button>
                 <button class="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors">
                    <i class="lucide-trash-2 w-4 h-4"></i>
                 </button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class ServicesComponent {
  services = [
    { name: 'Corte de Cabelo', duration: 30, price: 50, description: 'Corte masculino tradicional com acabamento.' },
    { name: 'Barba Terapia', duration: 45, price: 40, description: 'Barba completa com toalha quente e massagem.' },
    { name: 'Combo Premium', duration: 75, price: 80, description: 'Corte + Barba + Lavagem especial.' },
    { name: 'Sobrancelha', duration: 15, price: 15, description: 'Limpeza e desenho de sobrancelha.' },
  ];
}
