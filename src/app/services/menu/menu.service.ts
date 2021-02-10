import { Injectable } from '@angular/core';
import { Menu } from '@shared/Model/menu.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { ProgramService } from '@services/program/program.service';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private db: Promise<Dexie>;

  constructor(private programService: ProgramService) {

    this.db = OpenDB();

  }

  getAll(): Observable<Menu[]> {

    return new Observable(subscriber => {

        GetAll(this.db, TableEnum.Menus).then(menus => {

          this.programService.getAll().subscribe((programs) => {

            menus.forEach( menu => {

              const LinkedProgram = programs.find( program => program.id === menu.program);

              menu.linkTag = LinkedProgram ? LinkedProgram.linkTag : '/';

            });

            subscriber.next(menus);

            subscriber.complete();

          });

        });

    });

  }

  getByAuth(menu: Menu[]): Observable<Menu[]> {

    return new Observable(subscriber => {

      this.programService.getByAuth().subscribe((Programs) => {

        const AuthProgramMap = Programs.map(x => x.id);

        const AuthMenu: Menu[] = menu.filter( x => x.program === '' || AuthProgramMap.includes(x.program));

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
