import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../core/services/service.service';
import { ServiceModel } from '../../core/models/service.model';
import { AppointmentService } from '../../core/services/appointment.service';
import { CreateAppointmentRequest } from '../../core/models/appointment.model';

@Component({
  selector: 'app-public-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './public-booking.component.html'
})
export class PublicBookingComponent implements OnInit {
  private serviceService = inject(ServiceService);
  private appointmentService = inject(AppointmentService);

  services = signal<ServiceModel[]>([]);
  selectedService = signal<ServiceModel | null>(null);
  selectedDay = signal<any | null>(null);
  selectedSlot = signal<string | null>(null);
  
  customerName = signal('');
  customerEmail = signal('');
  
  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);

  days = [
    { week: 'Seg', day: 16, full: '2026-03-16' },
    { week: 'Ter', day: 17, full: '2026-03-17' },
    { week: 'Qua', day: 18, full: '2026-03-18' },
    { week: 'Qui', day: 19, full: '2026-03-19' },
    { week: 'Sex', day: 20, full: '2026-03-20' },
    { week: 'Sáb', day: 21, full: '2026-03-21' },
  ];

  slots = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00'];

  ngOnInit() {
    this.serviceService.getAll().subscribe(data => {
      this.services.set(data);
    });
  }

  selectService(service: ServiceModel) {
    this.selectedService.set(service);
  }

  selectDay(day: any) {
    this.selectedDay.set(day);
  }

  selectSlot(slot: string) {
    this.selectedSlot.set(slot);
  }

  onSubmit() {
    if (!this.selectedService() || !this.selectedDay() || !this.selectedSlot() || !this.customerName() || !this.customerEmail()) {
      this.error.set('Por favor, preencha todos os campos e selecione o serviço e horário.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const startTime = `${this.selectedDay().full}T${this.selectedSlot()}:00Z`;
    // Mocking 30 min duration for simplicity, or using service duration if available
    const duration = this.selectedService()?.durationMinutes || 30;
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60000);

    const request: CreateAppointmentRequest = {
      serviceId: this.selectedService()!.id!,
      employeeId: '00000000-0000-0000-0000-000000000000', // Mocking employee ID for now
      customerName: this.customerName(),
      customerEmail: this.customerEmail(),
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      tenantId: '00000000-0000-0000-0000-000000000000' // Mocking tenant ID for now
    };

    // Note: The backend controller needs to handle Guid.Empty or we need a real ID.
    // In our modified controller, we check for Guid.Empty if authenticated, 
    // but for public booking we should probably have a real TenantId.
    // Since we don't have multi-tenant resolution yet, I'll use a mock Guid.

    this.appointmentService.create(request).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Erro ao realizar o agendamento. Tente novamente.');
        console.error(err);
      }
    });
  }
}

