import { Injectable } from '@angular/core';
import { Role } from '@shared/Model/role.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private db: Promise<Dexie>;

  constructor() {

    this.db = OpenDB();

  }

  getAll(): Observable<Role[]> {

    return new Observable(subscriber => {

        GetAll(this.db, TableEnum.Roles).then(x => {

          subscriber.next(x);

          subscriber.complete();

        });

    });

  }

  getByRoleId(roleId: string): Observable<Role> {

    return new Observable(subscriber => {

        GetAll(this.db, TableEnum.Roles).then( roles => {

          const authRole = roles.filter(x => x.id === roleId)[0];

          console.log(authRole);

          subscriber.next(authRole);

          subscriber.complete();

        });

    });

  }

  create(role: Role): Observable<Role> {

    return new Observable(subscriber => {

      const cloneRole = clone(role);

      TableAdd(this.db, TableEnum.Roles, cloneRole).then(() => {

        subscriber.next(cloneRole);

        subscriber.complete();

      });

    });

  }

  update(role: Role): Observable<Role> {

    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Roles, role.id, role).then(() => {

        subscriber.next(role);

        subscriber.complete();

      });

    });

  }

  delete(role: Role): Observable<Role> {

    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Roles, role.id).then(() => {

        subscriber.next(role);

        subscriber.complete();

      });

    });

  }

}
