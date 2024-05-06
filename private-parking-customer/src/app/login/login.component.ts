import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [FormsModule, HttpClientModule],
    standalone: true,
    providers: [AuthService],
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email: string = '';
    password: string = '';
    rememberMe: boolean = false;

    constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
     
    }

    onLogin(): void {
        const self = this;
        this.authService.login(this.email, this.password).subscribe({
            next: () => {
                this.router.navigate(['/parking/reserve']);
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
