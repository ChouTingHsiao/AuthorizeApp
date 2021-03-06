import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { User } from '@shared/Model/user.model';
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

        subscriber.next(users);

        subscriber.complete();

      });

    });

  }

  create(user: User): Observable<User> {

    return new Observable(subscriber => {

      const cloneUser = clone(user);

      if (!cloneUser.role) {

        cloneUser.role = '';

      }

      TableAdd(this.db, TableEnum.Users, cloneUser).then(() => {

        subscriber.next(cloneUser);

        subscriber.complete();

      });

    });

  }

  update(user: User): Observable<User> {

    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Users, user.id, user).then(() => {

        subscriber.next(user);

        subscriber.complete();

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
