import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { MenuService } from '@services/menu/menu.service';
import { GroupService } from '@services/group/group.service';
import { GroupProgramService } from '@services/groupProgram/groupProgram.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private menuService: MenuService,
                private groupService: GroupService,
                private groupProgramService: GroupProgramService) {}

    canActivate(
       next: ActivatedRouteSnapshot,
       state: RouterStateSnapshot
    ): boolean {

    let loggedIn = true;

    this.menuService.getAll().pipe(
      switchMap( menus => this.groupService.getAll().pipe(
        switchMap( groups => this.groupProgramService.getAll().pipe(
          map(groupPrograms => ({ menus, groups, groupPrograms}))
        ))
      ))
    ).subscribe(({ menus, groups, groupPrograms }) => {

      const UserGroup: string =  localStorage.getItem('UserGroup');

      const groupId = groups.filter(x => x.name === UserGroup)[0].id;

      const ProgramName =  state.url.split('/')[2];

      const menu = menus.filter( x => x.linkTag === ProgramName)

      if (menu[0] && menu[0].program.length > 0) {

        loggedIn = groupPrograms.filter( x => x.group === groupId && x.program === menu[0].program).length > 0;

        if (!loggedIn) {
          console.log('Not Auth');
          this.router.navigate(['/401']);
        }
      }
    });

    return loggedIn;

  }
}
