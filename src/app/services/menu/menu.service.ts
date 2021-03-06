import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { Menu } from '@shared/Model/menu.model';
import { GroupProgram } from '@shared/Model/groupProgram.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { GroupProgramService } from '@services/groupProgram/groupProgram.service';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private db: Promise<Dexie>;

  constructor(private groupProgramService: GroupProgramService) {

    this.db = OpenDB();

  }

  getAll(): Observable<Menu[]> {

    return new Observable(subscriber => {

        GetAll(this.db, TableEnum.Menus).then( (menus: Menu[]) => {

          const UserGroup: string = localStorage.getItem('UserGroup');

          this.groupProgramService.getByGroupId(UserGroup).subscribe( groupPrograms => {

            menus.forEach( menu => {

              const LinkedProgram = groupPrograms.find( authGroupProgram => authGroupProgram.program === menu.program);

              menu.linkTag = LinkedProgram ? LinkedProgram.linkTag : '/';

            });

            subscriber.next(menus);

            subscriber.complete();

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

      const cloneMenu = clone(menu);

      if (!cloneMenu.program) {

        cloneMenu.program = '';

      }

      TableAdd(this.db, TableEnum.Menus, cloneMenu).then(() => {

        subscriber.next(cloneMenu);

        subscriber.complete();

      });

    });

  }

  update(menu: Menu): Observable<Menu> {

    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Menus, menu.id, menu).then(() => {

        subscriber.next(menu);

        subscriber.complete();

      });

    });

  }

  delete(menu: Menu): Observable<Menu> {

    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Menus, menu.id).then(() => {

        subscriber.next(menu);

        subscriber.complete();

      });

    });

  }

}
