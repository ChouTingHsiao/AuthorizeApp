import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { Role } from '@shared/Model/role.model';
import { Group } from '@shared/Model/group.model';
import { Program } from '@shared/Model/program.model';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(
       next: ActivatedRouteSnapshot,
       state: RouterStateSnapshot
    ): boolean {


    const  Roles: Role[] = JSON.parse(localStorage.getItem('Roles'));

    const  Groups: Group[] = JSON.parse(localStorage.getItem('Groups'));

    const Programs: Program[] = JSON.parse(localStorage.getItem('Programs'));

    const Auth: string =  localStorage.getItem('Auth');

    const ProgramName =  state.url.split('/')[2];

    const AuthId = Programs.filter(x => x.name === ProgramName);

    let AuthName = '' ;

    if (AuthId[0] && AuthId[0].auth.length > 0) {
      AuthName = Groups.filter(x => x.id === AuthId[0].auth)[0].role.map(x => {
          return  Roles.filter(y => y.id === x)[0].name;
      }).join(',');
    }

    const loggedIn: boolean = AuthName.includes(Auth) || AuthId[0].auth.length < 1;

    console.log(AuthName);
    console.log(Auth);

    if (!loggedIn) {
      console.log('Not Auth');
      this.router.navigate(['/401']);
    }

    return loggedIn;
  }
}
