import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSlotsComponent } from './manage-slots/manage-slots.component';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { ManageCustomersComponent } from './manage-customers/manage-customers.component';
import { authGuard } from '../../gaurds/auth.guard';
import { ManageParkingWorkingHours } from './manage-parking-working-hours/manage-parking-working-hours.component';

const routes: Routes = [
  {
    path: 'parkingTiming',
    component: ManageParkingWorkingHours,
    canActivate: [authGuard],
  },
  {
    path: 'slots',
    component: ManageSlotsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'reservations',
    component: ManageReservationsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'customers',
    component: ManageCustomersComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
