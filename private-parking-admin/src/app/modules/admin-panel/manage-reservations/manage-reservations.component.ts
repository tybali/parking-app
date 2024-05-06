import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ParkingSlotService } from '../services/slot.service';
import { ReservationService } from '../services/reservation.service';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrls: ['./manage-reservations.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class ManageReservationsComponent implements OnInit {
  reservations: any[] = [];
  slots: any[] = [];
  customers: any[] = [];
  newReservation: any = {
    slotId: '',
    customerName: '',
    start_time: '',
    end_time: '',
  };

  constructor(
    private reservationService: ReservationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getReservations().subscribe((data:any) => {
      this.reservations = data;
    });
  }


  cancelReservation(reservationId: string) {
    const self = this;

    this.reservationService.cancelReservation(reservationId).subscribe({
      next() {
        self.loadReservations();
      },
      error(err) {
        self.toastr.error(err.error.error, 'Error');
      },
      complete() {
      },
    });
  }


}
