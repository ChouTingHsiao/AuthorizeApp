import { authorizeDb } from '@shared/Dexie/AuthorizeDb.dexie';
import { nanoid } from 'nanoid'
import { Injectable } from '@angular/core';
import { Group } from '@shared/Model/group.model';
import { Role } from '@shared/Model/role.model';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor() {}

  getAll(): Observable<Group[]> {
    return new Observable(subscriber => {

      authorizeDb.Groups.toArray().then( (groups: Group[]) => {

        authorizeDb.Roles.toArray().then( (roles: Role[]) => {

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

      authorizeDb.Roles.toArray().then( (roles: Role[]) => {

        const cloneGroup = clone(group) as Group;

        cloneGroup.id = nanoid();

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

        authorizeDb.Groups.add(cloneGroup).then((added) => {

          console.log(added);

          subscriber.next(cloneGroup);

          subscriber.complete();
        });
      });
    });
  }

  update(group: Group): Observable<Group> {
    return new Observable(subscriber => {

      authorizeDb.Roles.toArray().then( (roles: Role[]) => {

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

        authorizeDb.Groups.update(cloneGroup.id, cloneGroup).then((updated) => {

          console.log(updated);

          subscriber.next(cloneGroup);

          subscriber.complete();
        });
      });
    });
  }

  delete(group: Group): Observable<Group> {
    return new Observable(subscriber => {

      authorizeDb.Groups.delete(group.id).then(() => {

        subscriber.next(group);

        subscriber.complete();
      });
    });
  }
}
