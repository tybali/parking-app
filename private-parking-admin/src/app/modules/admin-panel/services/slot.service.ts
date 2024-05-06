import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParkingSlotService {

  constructor(private http: HttpClient) {}

  getSlots(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/slots`);
  }

  addSlot(slot: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/admin/slots`, slot);
  }

  deleteSlot(slotId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/admin/slots/${slotId}`);
  }
}
