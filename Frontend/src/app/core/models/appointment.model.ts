export enum AppointmentStatus {
  Scheduled = 0,
  Confirmed = 1,
  Canceled = 2,
  Completed = 3
}

export interface AppointmentModel {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  serviceId: string;
  employeeId: string;
  customerName: string;
  customerEmail: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  tenantId: string;
}

export interface CreateAppointmentRequest {
  serviceId: string;
  employeeId: string;
  customerName: string;
  customerEmail: string;
  startTime: string;
  endTime: string;
  tenantId: string;
}
