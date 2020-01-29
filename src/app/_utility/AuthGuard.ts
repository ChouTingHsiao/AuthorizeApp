import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { Group } from '@shared/Model/group.model';
import { Program } from '@shared/Model/program.model';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    Groups: Group[] = JSON.parse(localStorage.getItem('Groups'));
    Programs: Program[] = JSON.parse(localStorage.getItem('Programs'));

    constructor(private router: Router) {}

    canActivate(
       next: ActivatedRouteSnapshot,
       state: RouterStateSnapshot
    ): boolean {

    const Auth: string =  localStorage.getItem('Auth');

    const ProgramName =  state.url.split('/')[2];

    const AuthId = this.Programs.filter(x => x.name === ProgramName);

    let AuthName = '' ;

    if (AuthId[0] && AuthId[0].auth.length > 0) {
      AuthName = this.Groups.filter(x => x.id === AuthId[0].auth)[0].name;
    }

    const loggedIn: boolean = AuthName.includes(Auth) || AuthId[0].auth.length < 1;

    console.log(ProgramName);

    if (!loggedIn) {
      console.log('Not Auth');
      this.router.navigate(['/Main']);
    }

    return loggedIn;
  }
}
