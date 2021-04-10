import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { Group } from '@shared/Model/group.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { RoleService } from '@services/role/role.service';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';

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

        GetAll(this.db, TableEnum.Groups).then( (groups: Group[]) => {

          subscriber.next(groups);

          subscriber.complete();

        });

    });

  }

  getByAuth(): Observable<Group[]> {

    return new Observable(subscriber => {

      this.getAll().subscribe( (groups: Group[]) => {

        const userRole: string =  localStorage.getItem('UserRole');

        const AuthGroup = groups.filter( group => group.roles.includes(userRole));

        subscriber.next(AuthGroup);

        subscriber.complete();

      });

    });

  }

  create(group: Group): Observable<Group> {

    return new Observable(subscriber => {

      const cloneGroup = clone(group);

      if (!cloneGroup.roles) {
        cloneGroup.roles = [''];
      }

      TableAdd(this.db, TableEnum.Groups, cloneGroup).then(() => {

        subscriber.next(cloneGroup);

        subscriber.complete();

      });

    });

  }

  update(group: Group): Observable<Group> {

    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Groups, group.id, group).then(() => {

        subscriber.next(group);

        subscriber.complete();

      });

    });

  }

  delete(group: Group): Observable<Group> {

    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Groups, group.id).then(() => {

        subscriber.next(group);

        subscriber.complete();

      });

    });

  }

}
