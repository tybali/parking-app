import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'parking-admin-panel';

  constructor(private router: Router, private authService: AuthService) {
    console.log('in app component')
  } // Injecting Router service
  
  onLogout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }
}
