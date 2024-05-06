import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ParkingSlotService } from '../services/slot.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-slots',
  templateUrl: './manage-slots.component.html',
  styleUrls: ['./manage-slots.component.css'],
  standalone: true,
  providers: [ParkingSlotService],
  imports: [FormsModule, HttpClientModule, CommonModule] // Import Angular FormsModule
})
export class ManageSlotsComponent implements OnInit {
  slots: any[] = []; // Array to hold parking slot data
  newSlot: any = {
    start_time: '',
    end_time: '',
    other_features: [],
    price: 0,
    cancellation_time_frame: 4,
    cancellation_charges: 0,
    disabled_people_only: false,
    has_shade: false,
    availability: true,
  };

  constructor(private http: HttpClient, private slotService: ParkingSlotService) {}

  ngOnInit() {
    // Fetch existing parking slots on component initialization
    this.loadSlots();
  }

  loadSlots() {
    this.slotService.getSlots().subscribe((data: any) => {
      this.slots = data;
    });
  }

  addSlot() {
    // Call the service to add a new slot
    this.slotService.addSlot(this.newSlot).subscribe(() => {
      this.loadSlots();
      this.resetNewSlot();
    });
  }

  resetNewSlot() {
    // Reset the form for adding a new slot
    this.newSlot = {
      start_time: '',
      end_time: '',
      other_features: [],
      price: 0,
      cancellation_time_frame: 4,
      cancellation_charges: 0,
      disabled_people_only: false,
      has_shade: false,
      availability: true,
    };
  }

  deleteSlot(slotId: string) {
    // Call the service to delete a slot
    this.slotService.deleteSlot(slotId).subscribe(() => {
      this.loadSlots();
    });
  }
}
