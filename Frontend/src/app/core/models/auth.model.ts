export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  tenantId?: string;
}

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  tenantId?: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  tenantId?: string;
}
