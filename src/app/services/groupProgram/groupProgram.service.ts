import { Injectable } from '@angular/core';
import { GroupProgram } from '@shared/Model/groupProgram.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class GroupProgramService {

  private db: Promise<Dexie>;

  constructor() {

    this.db = OpenDB();

  }

  getAll(): Observable<GroupProgram[]> {

    return new Observable(subscriber => {

      GetAll(this.db, TableEnum.GroupPrograms).then(x => {

        subscriber.next(x);

        subscriber.complete();

      });

    });

  }

  getByProgramId(groupId: string): Observable<GroupProgram[]> {

    return new Observable(subscriber => {

      GetAll(this.db, TableEnum.GroupPrograms).then((x: GroupProgram[])  => {

        const groupProgram = x.filter(y => y.group === groupId);

        subscriber.next(groupProgram);

        subscriber.complete();

      });

    });

  }

  create(groupProgram: GroupProgram): Observable<GroupProgram> {

    return new Observable(subscriber => {

      const cloneGroupProgram = clone(groupProgram);

      TableAdd(this.db, TableEnum.GroupPrograms, cloneGroupProgram).then(() => {

        subscriber.next(cloneGroupProgram);

        subscriber.complete();

      });

    });

  }

  update(groupProgram: GroupProgram): Observable<GroupProgram> {

    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.GroupPrograms, groupProgram.id, groupProgram).then(() => {

        subscriber.next(groupProgram);

        subscriber.complete();

      });

    });

  }

  delete(groupProgram: GroupProgram): Observable<GroupProgram> {

    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.GroupPrograms, groupProgram.id).then(() => {

        subscriber.next(groupProgram);

        subscriber.complete();

      });

    });

  }

}
