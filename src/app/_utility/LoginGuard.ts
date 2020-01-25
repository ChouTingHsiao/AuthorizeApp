import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {

    const Auth: string =  localStorage.getItem('Auth');

    const loggedIn: boolean = Auth && Auth.length > 0;

    if (!loggedIn) {
      console.log('Not Login');
      this.router.navigate(['/Login']);
    } else {
      console.log(`Role:${Auth}`);
    }

    return loggedIn;
  }
}
