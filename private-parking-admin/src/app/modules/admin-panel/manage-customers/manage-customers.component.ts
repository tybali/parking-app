import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class ManageCustomersComponent implements OnInit {
  customers: any[] = [];
  newCustomer: any = {
    email: '',
    passowrd: '',
    password_confirmation: '',
  };

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe((data:any) => {
      this.customers = data;
    });
  }

  addCustomer() {
    this.customerService.addCustomer(this.newCustomer).subscribe(() => {
      this.loadCustomers();
      this.resetNewCustomer();
    });
  }

  resetNewCustomer() {
    this.newCustomer = {
      email: '',
      passowrd: '',
      password_confirmation: ''
    };
  }

  deleteCustomer(customerId: string) {
    this.customerService.deleteCustomer(customerId).subscribe(() => {
      this.loadCustomers();
    });
  }
}
