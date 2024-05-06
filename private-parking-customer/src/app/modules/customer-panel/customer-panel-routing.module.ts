import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { authGuard } from '../../gaurds/auth.guard';
import { ReserveComponent } from './reserve/reserve.component';

const routes: Routes = [
  {
    path: 'reserve',
    component: ReserveComponent ,
    canActivate: [authGuard],
  },
  {
    path: 'reservations',
    component: ManageReservationsComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
