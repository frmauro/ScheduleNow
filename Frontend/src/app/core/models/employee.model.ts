export interface EmployeeModel {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  email: string;
  serviceIds: string[];
  tenantId?: string;
}

export interface CreateEmployeeRequest {
  name: string;
  email: string;
  serviceIds: string[];
}
