import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { RoleService } from '@services/role/role.service';
import { GroupService } from '@services/group/group.service';
import { ProgramService } from '@services/program/program.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private roleService: RoleService,
                private groupService: GroupService,
                private programService: ProgramService) {}

    canActivate(
       next: ActivatedRouteSnapshot,
       state: RouterStateSnapshot
    ): boolean {

    let loggedIn = true;

    this.programService.getAll().pipe(
      switchMap(Programs => this.groupService.getAll().pipe(
        switchMap(Groups => this.roleService.getAll().pipe(
          map(Roles => ({ Programs, Groups, Roles }))
        ))
      ))
    ).subscribe(({ Programs, Groups, Roles }) => {

      const Auth: string =  localStorage.getItem('Auth');

      const ProgramName =  state.url.split('/')[2];

      const Program = Programs.filter( x => x.name === ProgramName);

      if (Program[0] && Program[0].auth.length > 0) {

        const group = Groups.filter(x => x.id === Program[0].auth)[0];

        const AuthName = group.roles.map(x => Roles.filter(y => y.id === x)[0].name ).join(',');

        loggedIn = AuthName.includes(Auth);

        if (!loggedIn) {
          console.log('Not Auth');
          this.router.navigate(['/401']);
        }
      }
    });

    return loggedIn;

  }
}
