import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ButtonComponent],
  templateUrl: './employees.component.html'
})
export class EmployeesComponent {
  employees = [
    { name: 'John Doe', email: 'john@example.com', role: 'Gerente', active: true },
    { name: 'Sarah Connor', email: 'sarah@example.com', role: 'Especialista', active: true },
    { name: 'Kyle Reese', email: 'kyle@example.com', role: 'Atendente', active: false },
  ];
}
