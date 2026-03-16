import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <aside class="w-72 bg-slate-900 h-screen flex flex-col p-6 text-slate-300 transition-all duration-300">
      <div class="flex items-center gap-3 mb-10 px-2 transition-transform hover:scale-105 cursor-default">
        <div class="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center font-black text-white text-xl">SN</div>
        <span class="text-white font-bold text-xl tracking-tight">ScheduleNow</span>
      </div>

      <nav class="flex-1 space-y-2">
        <a routerLink="/dashboard" routerLinkActive="bg-white/10 text-white rounded-xl" class="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200">
          <lucide-icon name="layout-dashboard" class="w-5 h-5"></lucide-icon>
          <span class="font-medium">Dashboard</span>
        </a>
        <a routerLink="/calendar" routerLinkActive="bg-white/10 text-white rounded-xl" class="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200">
          <lucide-icon name="calendar" class="w-5 h-5"></lucide-icon>
          <span class="font-medium">Agenda</span>
        </a>
        <a routerLink="/employees" routerLinkActive="bg-white/10 text-white rounded-xl" class="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200">
          <lucide-icon name="users" class="w-5 h-5"></lucide-icon>
          <span class="font-medium">Funcionários</span>
        </a>
        <a routerLink="/services" routerLinkActive="bg-white/10 text-white rounded-xl" class="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200">
          <lucide-icon name="briefcase" class="w-5 h-5"></lucide-icon>
          <span class="font-medium">Serviços</span>
        </a>
      </nav>

      <div class="mt-auto pt-6 border-t border-slate-800">
        <div class="flex items-center gap-3 px-4 mb-6">
          <div class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-bold text-indigo-400">
            {{ user()?.name?.charAt(0) }}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-white text-sm font-bold truncate">{{ user()?.name }}</span>
            <span class="text-slate-500 text-xs truncate">{{ user()?.role }}</span>
          </div>
        </div>
        <button (click)="logout()" class="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200 font-medium">
          <lucide-icon name="log-out" class="w-5 h-5"></lucide-icon>
          Sair
        </button>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  private authService = inject(AuthService);
  user = this.authService.currentUser;

  logout(): void {
    this.authService.logout();
  }
}
