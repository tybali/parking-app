import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenKey = 'authToken';

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${environment.apiUrl}/auth/login`, { email:username, password }).pipe(
            tap((response: any) => {
                if (response.token) {
                    this.setToken(response.token);
                }
            })
        );
    }   
    

    logout(): void {
        this.clearToken();
    }

    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    clearToken(): void {
        localStorage.removeItem(this.tokenKey);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}
