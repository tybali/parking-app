import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {}

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/reservations`);
  }


  cancelReservation(reservationId: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/admin/reservations/${reservationId}/cancel`,{});
  }
}
