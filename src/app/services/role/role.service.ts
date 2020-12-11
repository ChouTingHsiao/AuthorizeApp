import { Injectable } from '@angular/core';
import { Role } from '@shared/Model/role.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { Observable } from 'rxjs';
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

  create(role: Role): Observable<Role[]> {
    return new Observable(subscriber => {

      TableAdd(this.db, TableEnum.Roles, role).then(() => {
        GetAll(this.db, TableEnum.Roles).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

  update(role: Role): Observable<Role[]> {
    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Roles, role.id, role).then(() => {
        GetAll(this.db, TableEnum.Roles).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

  delete(role: Role): Observable<Role[]> {
    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Roles, role.id).then(() => {
        GetAll(this.db, TableEnum.Roles).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }
}
