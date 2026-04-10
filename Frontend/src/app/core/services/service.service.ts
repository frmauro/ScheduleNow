import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceModel, CreateServiceRequest } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private readonly apiUrl = 'http://localhost:5255/api/Services';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ServiceModel[]> {
    return this.http.get<ServiceModel[]>(this.apiUrl);
  }

  getById(id: string): Observable<ServiceModel> {
    return this.http.get<ServiceModel>(`${this.apiUrl}/${id}`);
  }

  create(request: CreateServiceRequest): Observable<ServiceModel> {
    return this.http.post<ServiceModel>(this.apiUrl, request);
  }

  update(id: string, request: CreateServiceRequest): Observable<ServiceModel> {
    return this.http.put<ServiceModel>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
