import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [FormsModule, HttpClientModule], // Add HttpClientModule to imports
    standalone: true,
    providers: [AuthService], // Provide AuthService
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    rememberMe: boolean = false;

    constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
      this.router.navigate(['/app']).then((navigated) => {
        if (!navigated) {
            console.error('Navigation to / failed');
        }
      });
    }

    onLogin(): void {
        const  self = this;
        this.authService.login(this.username, this.password).subscribe({
            next: () => {
                this.router.navigate(['/manage/slots']);
                console.log('login next')
            },
            error: (error: any) => {
                self.toastr.error(error.error.error)

            },
            complete: () => {
                console.log('Login request complete');
            }
        });
    }
}

