import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {}
