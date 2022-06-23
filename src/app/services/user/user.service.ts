import { authorizeDb } from '@shared/Dexie/authorizeDb.dexie';
import { nanoid } from 'nanoid'
import { Injectable } from '@angular/core';
import { User } from '@shared/Model/user.model';
import { Role } from '@shared/Model/role.model';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  getAll(): Observable<User[]> {
    return new Observable((subscriber) => {

      authorizeDb.Users.toArray().then( (users: User[]) => {

        authorizeDb.Roles.toArray().then( (roles: Role[]) => {

          users.forEach((x) => {
            x.roleName = roles.filter(y => y.id ===  x.role)[0].name;
          });

          subscriber.next(users);

          subscriber.complete();
        });
      });
    });
  }

  create(user: User): Observable<User> {
    return new Observable(subscriber => {

      authorizeDb.Roles.toArray().then((roles: Role[]) => {

        const cloneUser = clone(user) as User;

        cloneUser.id = nanoid();

        if (!cloneUser.role) {

          cloneUser.role = '';

          cloneUser.roleName = '';
        }
        else{

          cloneUser.roleName = roles.filter(x => x.id ===  cloneUser.role)[0].name;
        }

        authorizeDb.Users.add(cloneUser).then((added) => {

          console.log(added);

          subscriber.next(cloneUser);

          subscriber.complete();
        });
      });
    });
  }

  update(user: User): Observable<User> {
    return new Observable(subscriber => {

      authorizeDb.Roles.toArray().then( (roles: Role[]) => {

        const cloneUser = clone(user) as User;

        if (!cloneUser.role) {

          cloneUser.role = '';

          cloneUser.roleName = '';
        }
        else{

          cloneUser.roleName = roles.filter(x => x.id ===  cloneUser.role)[0].name;
        }

        authorizeDb.Users.update(cloneUser.id, cloneUser).then((updated) => {

          console.log(updated);

          subscriber.next(cloneUser);

          subscriber.complete();
        });
      });
    });
  }

  delete(user: User): Observable<User> {
    return new Observable(subscriber => {

      authorizeDb.Users.delete(user.id).then((deleted) => {

        console.log(deleted);

        subscriber.next(user);

        subscriber.complete();
      });
    });
  }
}
