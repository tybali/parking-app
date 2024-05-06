import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

// Import the admin panel routing module
import { AdminPanelRoutingModule } from './modules/customer-panel/customer-panel-routing.module';
import { authGuard } from './gaurds/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/parking/reserve',  pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'parking',
    loadChildren: () => import('./modules/customer-panel/customer-panel.module').then(m => m.AdminPanelModule),
    canActivate: [authGuard], // the auth guard
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }, // Fallback route
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AdminPanelRoutingModule, 
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
