import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl overflow-hidden" 
         [ngClass]="padding ? 'p-6' : ''">
      <div *ngIf="title" class="mb-4">
        <h3 class="text-xl font-bold text-slate-900">{{ title }}</h3>
        <p *ngIf="subtitle" class="text-sm text-slate-500">{{ subtitle }}</p>
      </div>
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() padding = true;
}
