import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { MenuService } from '@services/menu/menu.service';
import { GroupProgramService } from '@services/groupProgram/groupProgram.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private menuService: MenuService,
                private groupProgramService: GroupProgramService) {}

    canActivate(
       next: ActivatedRouteSnapshot,
       state: RouterStateSnapshot
    ): Observable<boolean> {

    return new Observable( subscriber => {

      let loggedIn = false;

      this.menuService.getAll().pipe(
          switchMap( menus => this.groupProgramService.getAll().pipe(
            map(groupPrograms => ({ menus, groupPrograms }))
          ))
      ).subscribe(({ menus, groupPrograms }) => {

        const UserGroup: string = localStorage.getItem('UserGroup');

        const ProgramName =  state.url.split('/')[2];

        const menu = menus.filter( x => x.linkTag === ProgramName);

        if (menu[0] && menu[0].program.length > 0) {

          loggedIn = groupPrograms.filter( x => x.group === UserGroup && x.program === menu[0].program).length > 0;
        }

        if (!loggedIn) {

          console.log('Not Auth');

          this.router.navigate(['/401']);
        }

        subscriber.next(loggedIn);

        subscriber.complete();
      });
    });
  }
}
