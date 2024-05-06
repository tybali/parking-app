import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ParkingHoursService } from '../services/parking-hours.service';

@Component({
  selector: 'app-manage-parking-working-hours',
  templateUrl: './manage-parking-working-hours.component.html',
  styleUrls: ['./manage-parking-working-hours.component.css'],
  standalone: true,
  providers: [ParkingHoursService],
  imports: [FormsModule, HttpClientModule, CommonModule] // Import Angular FormsModule
})
export class ManageParkingWorkingHours implements OnInit {
  parkingHours: any = {
    id: '',
    startTime: '',
    endTime: '',
  };

  constructor(private http: HttpClient, private parkingHoursService: ParkingHoursService) {}

  ngOnInit() {
    this.loadParkingHours();
  }

  loadParkingHours() {
    this.parkingHoursService.getParkingHours().subscribe((data: any) => {
      console.log(data)
      this.parkingHours = data;
    });
  }

  onUpdate() {
    this.parkingHoursService.updateParkingHours(this.parkingHours.id,this.parkingHours).subscribe(() => {
      this.loadParkingHours();
    });
  }

  

}
