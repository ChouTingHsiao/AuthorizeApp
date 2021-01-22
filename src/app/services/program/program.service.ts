import { Injectable } from '@angular/core';
import { Program } from '@shared/Model/program.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { GroupService } from '@services/group/group.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import Dexie from 'dexie';


@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private db: Promise<Dexie>;

  constructor(private groupService: GroupService) {

    this.db = OpenDB();

  }

  getAll(): Observable<Program[]> {

    return new Observable(subscriber => {

        GetAll(this.db, TableEnum.Programs).then(x => {

          subscriber.next(x);

          subscriber.complete();

        });

    });

  }

  getByAuth(): Observable<Program[]> {

    return new Observable(subscriber => {

      this.getAll().pipe(
        switchMap(Programs => this.groupService.getByAuth().pipe(
          map(Groups => ({ Programs, Groups }))
        ))
      ).subscribe(({ Programs, Groups }) => {

        const AuthGroupMap = Groups.map(x => x.id);

        const AuthProgram = Programs.filter( x => x.auth === '' || AuthGroupMap.includes(x.auth));

        subscriber.next(AuthProgram);

        subscriber.complete();

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
