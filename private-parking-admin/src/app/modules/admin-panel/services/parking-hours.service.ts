import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParkingHoursService {
  constructor(private http: HttpClient) {}
  getParkingHours(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/parking_hours`);
  }

  updateParkingHours(id: number, body:any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/admin/parking_hours/${id}`, {parking_hours: body});
  }

}
