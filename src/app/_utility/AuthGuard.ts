import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { Role } from '@shared/Model/role.model';
import { Group } from '@shared/Model/group.model';
import { Program } from '@shared/Model/program.model';
import { RoleService } from '@services/role/role.service';
import { GroupService } from '@services/group/group.service';
import { ProgramService } from '@services/program/program.service';
import { Observable } from 'rxjs';

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

    const Roles: Observable<Role[]> = this.roleService.getAll();

    const Groups: Observable<Group[]> = this.groupService.getAll();

    const Programs: Observable<Program[]> = this.programService.getAll();

    let loggedIn = false;

    Programs.subscribe((programs) => {
        const Auth: string =  localStorage.getItem('Auth');

        const ProgramName =  state.url.split('/')[2];

        const AuthId = programs.filter( x => x.name === ProgramName);

        let AuthName = '' ;

        if (AuthId[0] && AuthId[0].auth.length > 0) {
          Groups.subscribe((groups) => {
              const group = groups.filter(x => x.id === AuthId[0].auth)[0];

              group.role.map(x => {
                  Roles.subscribe((roles) => {
                    roles.filter(y => y.id === x);
                    AuthName = roles[0].name;
                  });
              }).join(',');
          });
        }

        loggedIn = AuthName.includes(Auth)  || !AuthId[0] || AuthId[0].auth.length < 1;

        if (!loggedIn) {
          console.log('Not Auth');
          this.router.navigate(['/401']);
        }

    });

    return loggedIn;

  }
}
