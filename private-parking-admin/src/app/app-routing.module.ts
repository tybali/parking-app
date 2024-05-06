import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

// Import the admin panel routing module
import { AdminPanelRoutingModule } from './modules/admin-panel/admin-panel-routing.module';
import { authGuard } from './gaurds/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login',  pathMatch: 'full' }, // Home page route
  { path: 'login', component: LoginComponent }, // Login page route
  {
    path: 'manage',
    loadChildren: () => import('./modules/admin-panel/admin-panel.module').then(m => m.AdminPanelModule),
    canActivate: [authGuard], // Protect the admin panel route with the auth guard
  },
  // Add more routes here...
  { path: '**', redirectTo: '/', pathMatch: 'full' }, // Fallback route
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), // Configure the primary routes
    AdminPanelRoutingModule, // Import the admin panel routing module
  ],
  exports: [RouterModule], // Export the router module
})
export class AppRoutingModule {}
