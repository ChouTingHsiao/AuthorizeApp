import { Injectable } from '@angular/core';
import { Group } from '@shared/Model/group.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableInit, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { Observable } from 'rxjs';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  Groups: Group[] = [
    { id: '1', name: '管理員群組', role: ['1']}
  ];

  private db: Promise<Dexie>;

  constructor() {
    this.db = OpenDB();
  }

  getAll(): Observable<Group[]> {
    return new Observable(subscriber => {

      TableInit(this.db, TableEnum.Groups, this.Groups).then(() => {
        GetAll(this.db, TableEnum.Groups).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

  create(group: Group): Observable<Group[]> {
    return new Observable(subscriber => {

      if (!group.role) {
        group.role = [''];
      }

      TableAdd(this.db, TableEnum.Groups, group).then(() => {
        GetAll(this.db, TableEnum.Groups).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

  update(group: Group): Observable<Group[]> {
    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Groups, group.id, group).then(() => {
        GetAll(this.db, TableEnum.Groups).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

  delete(group: Group): Observable<Group[]> {
    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Groups, group.id).then(() => {
        GetAll(this.db, TableEnum.Groups).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

}
