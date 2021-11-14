import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { User } from '@shared/Model/user.model';
import { Role } from '@shared/Model/role.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private db: Promise<Dexie>;

  constructor() {

    this.db = OpenDB();
  }

  getAll(): Observable<User[]> {
    return new Observable(subscriber => {

      GetAll(this.db, TableEnum.Users).then( (users: User[]) => {

        GetAll(this.db, TableEnum.Roles).then( (roles: Role[]) => {

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

      GetAll(this.db, TableEnum.Roles).then( (roles: User[]) => {

        const cloneUser = clone(user) as User;

        if (!cloneUser.role) {

          cloneUser.role = '';

          cloneUser.roleName = '';
        }
        else{

          cloneUser.roleName = roles.filter(x => x.id ===  cloneUser.role)[0].name;
        }

        TableAdd(this.db, TableEnum.Users, cloneUser).then(() => {

          subscriber.next(cloneUser);

          subscriber.complete();
        });

      });

    });
  }

  update(user: User): Observable<User> {
    return new Observable(subscriber => {

      GetAll(this.db, TableEnum.Roles).then( (roles: Role[]) => {

        const cloneUser = clone(user) as User;

        if (!cloneUser.role) {

          cloneUser.role = '';

          cloneUser.roleName = '';
        }
        else{

          cloneUser.roleName = roles.filter(x => x.id ===  cloneUser.role)[0].name;
        }

        TableUpdate(this.db, TableEnum.Users, user.id, cloneUser).then(() => {

          subscriber.next(cloneUser);

          subscriber.complete();
        });

      });

    });
  }

  delete(user: User): Observable<User> {
    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Users, user.id).then(() => {

        subscriber.next(user);

        subscriber.complete();
      });

    });
  }

}
