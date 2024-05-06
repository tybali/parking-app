import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    // Check if the user is authenticated
    const isAuthenticated = authService.isAuthenticated();
    
    if (isAuthenticated) {
        // Allow route activation
        return true;
    } else {
        // Redirect to the login page
        console.log('navigating to login')
        router.navigate(['/login']);
        return false;
    }
};
