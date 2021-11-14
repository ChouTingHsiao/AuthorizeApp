import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { Group } from '@shared/Model/group.model';
import { Role } from '@shared/Model/role.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private db: Promise<Dexie>;

  constructor() {

    this.db = OpenDB();
  }

  getAll(): Observable<Group[]> {
    return new Observable(subscriber => {

      GetAll(this.db, TableEnum.Groups).then( (groups: Group[]) => {

        GetAll(this.db, TableEnum.Roles).then( (roles: Role[]) => {

          groups.forEach( group => {
            group.rolesName = group.roles.map(x => {
              const role = roles.filter(y => y.id === x)[0];
              return  role ? role.name : '';
            }).join(',');
          });

          subscriber.next(groups);

          subscriber.complete();
        });

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

      GetAll(this.db, TableEnum.Roles).then( (roles: Role[]) => {

        const cloneGroup = clone(group) as Group;

        if (!cloneGroup.roles) {

          cloneGroup.roles = [''];

          cloneGroup.rolesName = '';
        }
        else{

          cloneGroup.rolesName = cloneGroup.roles.map(x => {
            const role = roles.filter(y => y.id === x)[0];
            return  role ? role.name : '';
          }).join(',');
        }

        TableAdd(this.db, TableEnum.Groups, cloneGroup).then(() => {

          subscriber.next(cloneGroup);

          subscriber.complete();
        });

      });

    });
  }

  update(group: Group): Observable<Group> {
    return new Observable(subscriber => {

      GetAll(this.db, TableEnum.Roles).then( (roles: Role[]) => {

        const cloneGroup = clone(group) as Group;

        if (!cloneGroup.roles) {

          cloneGroup.roles = [''];

          cloneGroup.rolesName = '';
        }
        else{

          cloneGroup.rolesName = cloneGroup.roles.map(x => {
            const role = roles.filter(y => y.id === x)[0];
            return  role ? role.name : '';
          }).join(',');
        }

        TableUpdate(this.db, TableEnum.Groups, group.id, cloneGroup).then(() => {

          subscriber.next(cloneGroup);

          subscriber.complete();
        });

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
