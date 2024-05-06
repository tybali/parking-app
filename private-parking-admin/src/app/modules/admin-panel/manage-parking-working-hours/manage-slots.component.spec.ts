import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageParkingWorkingHours } from './manage-parking-working-hours.component';

describe('ManageSlotsComponent', () => {
  let component: ManageParkingWorkingHours;
  let fixture: ComponentFixture<ManageParkingWorkingHours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageParkingWorkingHours]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageParkingWorkingHours);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
