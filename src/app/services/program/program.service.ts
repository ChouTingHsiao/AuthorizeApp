import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { Program } from '@shared/Model/program.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { ButtonService } from '@services/button/button.service';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private db: Promise<Dexie>;

  constructor(private buttonService: ButtonService) {

    this.db = OpenDB();
  }

  getAll(): Observable<Program[]> {
    return new Observable(subscriber => {

      GetAll(this.db, TableEnum.Programs).then( (programs: Program[]) => {

        this.buttonService.getAll().subscribe( buttons => {

          programs.forEach( program => {

            const LinkedButtons = buttons.filter( button => button.program === program.id);

            program.buttons = LinkedButtons;

          });

          subscriber.next(programs);

          subscriber.complete();
        });

      });

    });
  }

  create(program: Program): Observable<Program> {
    return new Observable(subscriber => {

      const cloneProgram = clone(program) as Program;

      if (!cloneProgram.auth) {

        cloneProgram.auth = '';

      }

      TableAdd(this.db, TableEnum.Programs, cloneProgram).then(() => {

        subscriber.next(cloneProgram);

        subscriber.complete();
      });

    });
  }

  update(program: Program): Observable<Program> {
    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Programs, program.id, program).then(() => {

        subscriber.next(program);

        subscriber.complete();
      });

    });
  }

  delete(program: Program): Observable<Program> {
    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Programs, program.id).then(() => {

        subscriber.next(program);

        subscriber.complete();
      });

    });
  }

}
