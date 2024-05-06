import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    imports: [FormsModule, HttpClientModule],
    standalone: true,
    providers: [AuthService],
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    email: string = '';
    password: string = '';
    password_confirmation: string = '';

    constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
     
    }

    onLogin(): void {
        const self = this;
        this.authService.register(this.email, this.password, this.password_confirmation).subscribe({
            next: () => {
                this.router.navigate(['/parking/reserve']);
            },
            error: (error: any) => {
                if(error.error.error)
                    self.toastr.error(error.error.error)
                else if(error.error.errors){
                    self.toastr.error(error.error.errors[0])
                }
            },
            complete: () => {
                console.log('Login request complete');
            }
        });
    }
}
