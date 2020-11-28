import { Injectable } from '@angular/core';
import { User } from '@shared/Model/user.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableInit, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { Observable } from 'rxjs';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Users: User[] = [
    { id: '1', name: 'ADMIN', password: 'ADMIN', role: '1' },
    { id: '2', name: 'USER', password: 'USER', role: '2' }
  ];

  private db: Promise<Dexie>;

  constructor() {
    this.db = OpenDB();
  }

  getAll(): Observable<User[]> {
    return new Observable(subscriber => {

      TableInit(this.db, TableEnum.Users, this.Users).then(() => {
        GetAll(this.db, TableEnum.Users).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

  create(user: User): Observable<User[]> {
    return new Observable(subscriber => {

      if (!user.role) {
        user.role = '';
      }

      TableAdd(this.db, TableEnum.Users, user).then(() => {
        GetAll(this.db, TableEnum.Users).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

  update(user: User): Observable<User[]> {
    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Users, user.id, user).then(() => {
        GetAll(this.db, TableEnum.Users).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

  delete(user: User): Observable<User[]> {
    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Users, user.id).then(() => {
        GetAll(this.db, TableEnum.Users).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }
}
