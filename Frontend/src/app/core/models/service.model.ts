export interface ServiceModel {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  tenantId?: string;
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
}
