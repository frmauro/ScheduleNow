import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { EmployeeService } from '../../core/services/employee.service';
import { ServiceService } from '../../core/services/service.service';
import { EmployeeModel, CreateEmployeeRequest } from '../../core/models/employee.model';
import { ServiceModel } from '../../core/models/service.model';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, ButtonComponent],
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private serviceService = inject(ServiceService);

  employees = signal<EmployeeModel[]>([]);
  services = signal<ServiceModel[]>([]);
  loading = signal(false);
  showModal = signal(false);
  saving = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  editingEmployeeId = signal<string | null>(null);

  newEmployee: CreateEmployeeRequest = {
    name: '',
    email: '',
    serviceIds: []
  };

  ngOnInit(): void {
    this.loadEmployees();
    this.loadServices();
  }

  loadEmployees(): void {
    this.loading.set(true);
    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.employees.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        this.loading.set(false);
      }
    });
  }

  loadServices(): void {
    this.serviceService.getAll().subscribe({
      next: (data) => {
        this.services.set(data);
      },
      error: (err) => {
        console.error('Error loading services:', err);
      }
    });
  }

  openNewEmployeeModal(): void {
    this.newEmployee = { name: '', email: '', serviceIds: [] };
    this.editingEmployeeId.set(null);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.showModal.set(true);
  }

  openEditEmployeeModal(emp: EmployeeModel): void {
    if (!emp.id) return;
    this.newEmployee = {
      name: emp.name,
      email: emp.email,
      serviceIds: [...emp.serviceIds]
    };
    this.editingEmployeeId.set(emp.id);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }

  isServiceSelected(id?: string): boolean {
    if (!id) return false;
    return this.newEmployee.serviceIds.includes(id);
  }

  toggleServiceSelection(id?: string): void {
    if (!id) return;
    const index = this.newEmployee.serviceIds.indexOf(id);
    if (index > -1) {
      this.newEmployee.serviceIds.splice(index, 1);
    } else {
      this.newEmployee.serviceIds.push(id);
    }
  }

  getServiceNames(serviceIds: string[]): string {
    if (!serviceIds || serviceIds.length === 0) {
      return 'Nenhum serviço';
    }
    const serviceNames = serviceIds
      .map(id => this.services().find(s => s.id === id)?.name)
      .filter(name => !!name);
    
    return serviceNames.length > 0 ? serviceNames.join(', ') : 'Nenhum serviço';
  }

  submitForm(): void {
    // Validation
    if (!this.newEmployee.name.trim()) {
      this.errorMessage.set('O nome do funcionário é obrigatório.');
      return;
    }
    if (!this.newEmployee.email.trim()) {
      this.errorMessage.set('O e-mail do funcionário é obrigatório.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.newEmployee.email)) {
      this.errorMessage.set('O e-mail informado não é válido.');
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);

    const editId = this.editingEmployeeId();
    if (editId) {
      this.employeeService.update(editId, this.newEmployee).subscribe({
        next: (updated) => {
          this.employees.update(list => list.map(emp => emp.id === editId ? updated : emp));
          this.saving.set(false);
          this.successMessage.set('Funcionário atualizado com sucesso!');
          setTimeout(() => this.closeModal(), 1200);
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          this.saving.set(false);
          this.errorMessage.set(
            err.error?.message || err.error?.title || 'Erro ao atualizar o funcionário. Tente novamente.'
          );
        }
      });
    } else {
      this.employeeService.create(this.newEmployee).subscribe({
        next: (created) => {
          this.employees.update(list => [...list, created]);
          this.saving.set(false);
          this.successMessage.set('Funcionário criado com sucesso!');
          setTimeout(() => this.closeModal(), 1200);
        },
        error: (err) => {
          console.error('Error creating employee:', err);
          this.saving.set(false);
          this.errorMessage.set(
            err.error?.message || err.error?.title || 'Erro ao criar o funcionário. Tente novamente.'
          );
        }
      });
    }
  }

  deleteEmployee(emp: EmployeeModel): void {
    if (!emp.id) return;
    if (!confirm(`Deseja realmente remover o funcionário "${emp.name}"?`)) return;

    this.employeeService.delete(emp.id).subscribe({
      next: () => {
        this.employees.update(list => list.filter(e => e.id !== emp.id));
      },
      error: (err) => {
        console.error('Error deleting employee:', err);
        alert('Erro ao excluir o funcionário.');
      }
    });
  }
}
