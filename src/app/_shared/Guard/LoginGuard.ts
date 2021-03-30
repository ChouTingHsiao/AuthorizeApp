import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router) {}

  canActivate() {

    const userRole: string =  localStorage.getItem('UserRole');

    const loggedIn: boolean = userRole && userRole.length > 0;

    if (!loggedIn) {
      console.log('Not Login');
      this.router.navigate(['/Login']);
    } else {
      console.log(`Role:${userRole}`);
    }

    return loggedIn;
  }
}
