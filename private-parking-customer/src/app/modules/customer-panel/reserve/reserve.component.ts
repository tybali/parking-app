import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class ReserveComponent implements OnInit {
  slots: any[] = [];


  newReservation: any = {
    start_time: '',
    hours: '',
    disabled_people_only: '',
    has_shade: '',
    car_type: '',
  };

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
  }


  reserve(slot_id: number) {
    const self = this;
    this.reservationService.reserveSlot({...this.newReservation, slot_id}).subscribe({
      next(value) {
        self.toastr.success('Slot Has been reserved', 'Success')
        self.router.navigate(['/parking/reservations'])
      },
      error(error) {
        if(error.error.error)
          self.toastr.error(error.error.error)
        else if(error.error.errors){
          self.toastr.error(error.error.errors[0])
      }
      },
      complete() {
        
      }
    })
  }

  searchSlots() {
    const self = this;
    this.reservationService.searchSlots(this.newReservation).subscribe({
      next(data:any) {
        self.slots = data;
        if(self.slots.length<1){
          self.toastr.warning('No Slots found on this criteria.')
        }
      },
      error(error) {
        if(error.error.error)
          self.toastr.error(error.error.error)
        else if(error.error.errors){
          self.toastr.error(error.error.errors[0])
      }
      },
      complete() {
        
      },
    });
  }

  

}
