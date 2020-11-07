import { Injectable } from '@angular/core';
import { Role } from '@shared/Model/role.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableInit, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { Observable } from 'rxjs';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  Roles: Role[] = [
    { id: '1', name: 'ADMIN', remark: '管理員' },
    { id: '2', name: 'USER', remark: '一般使用者' }
  ];

  private db: Promise<Dexie>;

  constructor() {
    this.db = OpenDB();
  }

  getAll(): Observable<Role[]> {
    return new Observable(subscriber => {

      TableInit(this.db, TableEnum.Roles, this.Roles).then(() => {
        GetAll(this.db, TableEnum.Roles, subscriber);
      });

    });
  }

  create(role: Role): Observable<Role[]> {
    return new Observable(subscriber => {

      TableAdd(this.db, TableEnum.Roles, role).then(() => {
        GetAll(this.db, TableEnum.Roles, subscriber);
      });

    });
  }

  update(role: Role): Observable<Role[]> {
    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Roles, role.id, role).then(() => {
        GetAll(this.db, TableEnum.Roles, subscriber);
      });

    });
  }

  delete(role: Role): Observable<Role[]> {
    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Roles, role.id).then(() => {
        GetAll(this.db, TableEnum.Roles, subscriber);
      });

    });
  }
}
