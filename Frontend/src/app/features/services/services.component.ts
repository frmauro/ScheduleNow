import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ServiceService } from '../../core/services/service.service';
import { ServiceModel, CreateServiceRequest } from '../../core/models/service.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, ButtonComponent],
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {
  private serviceService = inject(ServiceService);

  services = signal<ServiceModel[]>([]);
  loading = signal(false);
  showModal = signal(false);
  saving = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  newService: CreateServiceRequest = {
    name: '',
    description: '',
    durationMinutes: 0,
    price: 0
  };

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loading.set(true);
    this.serviceService.getAll().subscribe({
      next: (data) => {
        this.services.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading services:', err);
        this.loading.set(false);
      }
    });
  }

  openNewServiceModal(): void {
    this.newService = { name: '', description: '', durationMinutes: 0, price: 0 };
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }

  submitNewService(): void {
    // Validation
    if (!this.newService.name.trim()) {
      this.errorMessage.set('O nome do serviço é obrigatório.');
      return;
    }
    if (this.newService.durationMinutes <= 0) {
      this.errorMessage.set('A duração deve ser maior que zero.');
      return;
    }
    if (this.newService.price < 0) {
      this.errorMessage.set('O preço não pode ser negativo.');
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);

    this.serviceService.create(this.newService).subscribe({
      next: (created) => {
        this.services.update(list => [...list, created]);
        this.saving.set(false);
        this.successMessage.set('Serviço criado com sucesso!');
        setTimeout(() => this.closeModal(), 1200);
      },
      error: (err) => {
        console.error('Error creating service:', err);
        this.saving.set(false);
        this.errorMessage.set(
          err.error?.message || err.error?.title || 'Erro ao criar o serviço. Tente novamente.'
        );
      }
    });
  }

  deleteService(svc: ServiceModel): void {
    if (!svc.id) return;
    if (!confirm(`Deseja realmente excluir o serviço "${svc.name}"?`)) return;

    this.serviceService.delete(svc.id).subscribe({
      next: () => {
        this.services.update(list => list.filter(s => s.id !== svc.id));
      },
      error: (err) => {
        console.error('Error deleting service:', err);
        alert('Erro ao excluir o serviço.');
      }
    });
  }
}
