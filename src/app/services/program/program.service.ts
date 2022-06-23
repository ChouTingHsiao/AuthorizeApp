import { authorizeDb } from '@shared/Dexie/authorizeDb.dexie';
import { nanoid } from 'nanoid'
import { Injectable } from '@angular/core';
import { Program } from '@shared/Model/program.model';
import { ButtonService } from '@services/button/button.service';
import { Observable } from 'rxjs';
import { clone } from '@shared/Method/object.method';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private buttonService: ButtonService) {}

  getAll(): Observable<Program[]> {
    return new Observable(subscriber => {

      authorizeDb.Programs.toArray().then( (programs: Program[]) => {

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

      cloneProgram.id = nanoid();

      if (!cloneProgram.auth) {

        cloneProgram.auth = '';
      }

      authorizeDb.Programs.add(cloneProgram).then((added) => {

        console.log(added);

        subscriber.next(cloneProgram);

        subscriber.complete();
      });
    });
  }

  update(program: Program): Observable<Program> {
    return new Observable(subscriber => {

      authorizeDb.Programs.update(program.id, program).then((updated) => {

        console.log(updated);

        subscriber.next(program);

        subscriber.complete();
      });
    });
  }

  delete(program: Program): Observable<Program> {
    return new Observable(subscriber => {

      authorizeDb.Programs.delete(program.id).then((deleted) => {

        console.log(deleted);

        subscriber.next(program);

        subscriber.complete();
      });
    });
  }
}
