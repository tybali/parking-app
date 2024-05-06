import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/customers`);
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/admin/customers`, customer);
  }

  deleteCustomer(customerId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/admin/customers/${customerId}`);
  }
}
