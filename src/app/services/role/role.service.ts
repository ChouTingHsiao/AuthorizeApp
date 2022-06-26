import { authorizeDb } from '@shared/Dexie/AuthorizeDb.dexie';
import { nanoid } from 'nanoid'
import { Injectable } from '@angular/core';
import { Role } from '@shared/Model/role.model';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() {}

  getAll(): Observable<Role[]> {
    return new Observable(subscriber => {

      authorizeDb.Roles.toArray().then( (roles: Role[]) => {

        subscriber.next(roles);

        subscriber.complete();
      });
    });
  }

  getByRoleId(roleId: string): Observable<Role> {
    return new Observable(subscriber => {

      authorizeDb.Roles.toArray().then( (roles: Role[]) => {

        const authRole = roles.filter(x => x.id === roleId)[0];

        subscriber.next(authRole);

        subscriber.complete();
      });
    });
  }

  create(role: Role): Observable<Role> {
    return new Observable(subscriber => {

      const cloneRole = clone(role) as Role;

      cloneRole.id = nanoid();

      authorizeDb.Roles.add(cloneRole).then((added) => {

        console.log(added);

        subscriber.next(cloneRole);

        subscriber.complete();
      });
    });
  }

  update(role: Role): Observable<Role> {
    return new Observable(subscriber => {

      authorizeDb.Roles.update(role.id, role).then((updated) => {

        console.log(updated);

        subscriber.next(role);

        subscriber.complete();
      });
    });
  }

  delete(role: Role): Observable<Role> {
    return new Observable(subscriber => {

      authorizeDb.Roles.delete(role.id).then(() => {

        subscriber.next(role);

        subscriber.complete();
      });
    });
  }
}
