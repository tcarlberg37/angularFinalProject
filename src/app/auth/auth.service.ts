import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  login(username: string, password: string): Observable<boolean> {
    if (username == "admin" && password == "admin"){
      return of(true).pipe(
        delay(1000),
        tap(val => this.isLoggedIn = true)
      );
    } else {
      this.isLoggedIn = false;
      return of(false);
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
