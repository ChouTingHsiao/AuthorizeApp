import { Injectable } from '@angular/core';
import { Group } from '@shared/Model/group.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { RoleService } from '@services/role/role.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private db: Promise<Dexie>;

  constructor(private roleService: RoleService) {

    this.db = OpenDB();

  }

  getAll(): Observable<Group[]> {

    return new Observable(subscriber => {

        GetAll(this.db, TableEnum.Groups).then(x => {

          subscriber.next(x);

          subscriber.complete();

        });

    });

  }

  getByAuth(): Observable<Group[]> {

    return new Observable(subscriber => {

      this.getAll().pipe(
        switchMap(Groups => this.roleService.getAll().pipe(
          map(Roles => ({ Groups, Roles }))
        ))
      ).subscribe(({ Groups, Roles }) => {

        const Auth: string =  localStorage.getItem('Auth');

        const roleId: string = Roles.filter(x => x.name === Auth)[0].id;

        const AuthGroup = Groups.filter( x => x.roles.includes(roleId));

        subscriber.next(AuthGroup);

        subscriber.complete();

      });

    });

  }

  create(group: Group): Observable<Group[]> {

    return new Observable(subscriber => {

      if (!group.roles) {
        group.roles = [''];
      }

      TableAdd(this.db, TableEnum.Groups, group).then(() => {

        GetAll(this.db, TableEnum.Groups).then(x => {

          subscriber.next(x);

          subscriber.complete();

        });

      });

    });

  }

  update(group: Group): Observable<Group[]> {

    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Groups, group.id, group).then(() => {

        GetAll(this.db, TableEnum.Groups).then(x => {

          subscriber.next(x);

          subscriber.complete();

        });

      });

    });

  }

  delete(group: Group): Observable<Group[]> {

    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Groups, group.id).then(() => {

        GetAll(this.db, TableEnum.Groups).then(x => {

          subscriber.next(x);

          subscriber.complete();

        });

      });

    });

  }

}
