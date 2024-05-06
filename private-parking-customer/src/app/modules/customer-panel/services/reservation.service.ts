import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {}

  searchSlots(params:any): Observable<any[]> {
    console.log(params)
    params.start_time = params.start_time.replace('T', ' ')
    const searchParams = new URLSearchParams(params as any).toString();

    return this.http.get<any[]>(`${environment.apiUrl}/customer/slots?${searchParams}`);
  }


  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/customer/reservations`);
  }

  reserveSlot(reservation: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/customer/reservations`, reservation);
  }

  cancelReservation(reservationId: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/customer/reservations/${reservationId}/cancel`,{});
  }
}
