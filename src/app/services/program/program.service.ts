import { Injectable } from '@angular/core';
import { Program } from '@shared/Model/program.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableInit, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { Observable } from 'rxjs';
import Dexie from 'dexie';


@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  Programs: Program[] = [
    { id: '1', name: 'User', remark: '使用者', linkTag: 'User', auth: '1' },
    { id: '2', name: 'Role', remark: '角色', linkTag: 'Role', auth: '1' },
    { id: '3', name: 'Group', remark: '群組', linkTag: 'Group', auth: '' },
    { id: '4', name: 'Program', remark: '程式', linkTag: 'Program', auth: '' },
    { id: '5', name: 'Menu', remark: '選單', linkTag: 'Menu', auth: '' },
  ];

  private db: Promise<Dexie>;

  constructor() {
    this.db = OpenDB();
  }

  getAll(): Observable<Program[]> {
    return new Observable(subscriber => {

      TableInit(this.db, TableEnum.Programs, this.Programs).then(() => {
        GetAll(this.db, TableEnum.Programs).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

  create(program: Program): Observable<Program[]> {

    return new Observable(subscriber => {

      if (!program.auth) {
        program.auth = '';
      }

      TableAdd(this.db, TableEnum.Programs, program).then(() => {
        GetAll(this.db, TableEnum.Programs).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });

  }

  update(program: Program): Observable<Program[]> {
    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Programs, program.id, program).then(() => {
        GetAll(this.db, TableEnum.Programs).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

  delete(program: Program): Observable<Program[]> {
    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Programs, program.id).then(() => {
        GetAll(this.db, TableEnum.Programs).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

}
