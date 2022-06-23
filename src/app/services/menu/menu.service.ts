import { authorizeDb } from '@shared/Dexie/authorizeDb.dexie';
import { nanoid } from 'nanoid'
import { Injectable } from '@angular/core';
import { Menu } from '@shared/Model/menu.model';
import { Program } from '@shared/Model/program.model';
import { GroupProgram } from '@shared/Model/groupProgram.model';
import { GroupProgramService } from '@services/groupProgram/groupProgram.service';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private groupProgramService: GroupProgramService) {}

  getAll(): Observable<Menu[]> {
    return new Observable(subscriber => {

      authorizeDb.Menus.toArray().then( (menus: Menu[]) => {

        authorizeDb.Programs.toArray().then( (programs: Program[]) => {

          const UserGroup: string = localStorage.getItem('UserGroup');

          this.groupProgramService.getByGroupId(UserGroup).subscribe( groupPrograms => {

            menus.forEach( menu => {

              // Menu Link
              const LinkedProgram = groupPrograms.find( authGroupProgram => authGroupProgram.program === menu.program);

              menu.linkTag = LinkedProgram ? LinkedProgram.linkTag : '/';

              // Menu Authorize Program
              const authorizeProgram = programs.filter(x => x.id === menu.program);

              const isNotAuthEmpty = menu.program !== '';

              const isAuthFound = authorizeProgram !== undefined && authorizeProgram.length > 0;

              if (isNotAuthEmpty && isAuthFound) {
                menu.programName = authorizeProgram[0].name;
              }

            });

            subscriber.next(menus);

            subscriber.complete();
          });
        });
      });
    });
  }

  getAuthMenus(menus: Menu[]): Observable<Menu[]> {
    return new Observable(subscriber => {

      const UserGroup: string = localStorage.getItem('UserGroup');

      this.groupProgramService.getByGroupId(UserGroup).subscribe( (groupPrograms: GroupProgram[]) => {

        const authGroupProgramMap = groupPrograms.map( authGroupProgram => authGroupProgram.program);

        const AuthMenu: Menu[] = menus.filter( menu => menu.program === '' || authGroupProgramMap.includes(menu.program));

        subscriber.next(AuthMenu);

        subscriber.complete();
      });

    });
  }

  create(menu: Menu): Observable<Menu> {
    return new Observable(subscriber => {

      authorizeDb.Programs.toArray().then( (programs: Program[]) => {

        const cloneMenu = clone(menu) as Menu;

        cloneMenu.id = nanoid();

        if (!cloneMenu.program) {

          cloneMenu.program = '';

          cloneMenu.programName = '';
        }
        else{

          cloneMenu.programName = programs.filter(x => x.id ===  cloneMenu.program)[0].name;
        }

        authorizeDb.Menus.add(cloneMenu).then((added) => {

          console.log(added);

          subscriber.next(cloneMenu);

          subscriber.complete();
        });

      });

    });
  }

  update(menu: Menu): Observable<Menu> {
    return new Observable(subscriber => {

      authorizeDb.Programs.toArray().then( (programs: Program[]) => {

        const cloneMenu = clone(menu) as Menu;

        if (!cloneMenu.program) {

          cloneMenu.program = '';

          cloneMenu.programName = '';
        }
        else{

          cloneMenu.programName = programs.filter(x => x.id ===  cloneMenu.program)[0].name;
        }

        authorizeDb.Menus.update(cloneMenu.id, cloneMenu).then((updated) => {

          console.log(updated);

          subscriber.next(cloneMenu);

          subscriber.complete();
        });
      });
    });
  }

  delete(menu: Menu): Observable<Menu> {
    return new Observable(subscriber => {

      authorizeDb.Menus.delete(menu.id).then((deleted) => {

        console.log(deleted);

        subscriber.next(menu);

        subscriber.complete();
      });

    });
  }

}
