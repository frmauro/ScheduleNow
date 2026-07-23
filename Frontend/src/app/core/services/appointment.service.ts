import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentModel, CreateAppointmentRequest } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly apiUrl = 'http://localhost:5255/api/Appointments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AppointmentModel[]> {
    return this.http.get<AppointmentModel[]>(this.apiUrl);
  }

  create(request: CreateAppointmentRequest): Observable<AppointmentModel> {
    return this.http.post<AppointmentModel>(this.apiUrl, request);
  }

  cancel(id: string): Observable<AppointmentModel> {
    return this.http.put<AppointmentModel>(`${this.apiUrl}/${id}/cancel`, {});
  }
}
