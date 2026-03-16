import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  template: `
    <div class="flex h-screen bg-slate-50">
      <app-sidebar></app-sidebar>
      <main class="flex-1 overflow-y-auto p-10">
        <header class="mb-10">
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Agenda</h1>
          <p class="text-slate-500 mt-1">Visualize e gerencie seus compromissos</p>
        </header>

        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 h-[calc(100vh-250px)]">
           <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                 <button class="p-2 hover:bg-slate-50 rounded-xl transition-colors"><i class="lucide-chevron-left w-6 h-6"></i></button>
                 <h2 class="text-xl font-bold text-slate-900">Março 2026</h2>
                 <button class="p-2 hover:bg-slate-50 rounded-xl transition-colors"><i class="lucide-chevron-right w-6 h-6"></i></button>
              </div>
              <div class="flex bg-slate-100 p-1 rounded-xl">
                 <button class="px-4 py-2 text-sm font-bold text-indigo-600 bg-white shadow-sm rounded-lg">Semana</button>
                 <button class="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 rounded-lg">Dia</button>
              </div>
           </div>

           <div class="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
              <div *ngFor="let day of ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']" class="bg-slate-50 p-4 text-center">
                 <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ day }}</span>
              </div>
              <div *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14, 15]" class="bg-white min-h-[120px] p-4 group hover:bg-slate-50/50 transition-colors relative">
                 <span class="text-sm font-bold text-slate-400">{{ i + 15 }}</span>
                 <div *ngIf="i === 2" class="mt-2 p-2 bg-indigo-50 border-l-4 border-indigo-500 rounded-lg">
                    <p class="text-[10px] font-bold text-indigo-700">14:00 - João Silva</p>
                 </div>
                 <div *ngIf="i === 5" class="mt-2 p-2 bg-emerald-50 border-l-4 border-emerald-500 rounded-lg">
                    <p class="text-[10px] font-bold text-emerald-700">10:30 - Maria Oliveira</p>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  `
})
export class CalendarComponent {}
