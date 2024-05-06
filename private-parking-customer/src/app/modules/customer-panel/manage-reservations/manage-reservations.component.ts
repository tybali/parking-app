import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrls: ['./manage-reservations.component.css'],
  standalone: true,
  providers: [],
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


  resetNewReservation() {
    this.newReservation = {
      slotId: '',
      customerName: '',
      startTime: '',
      endTime: '',
    };
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
