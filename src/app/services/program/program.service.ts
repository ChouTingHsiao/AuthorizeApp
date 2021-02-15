import { Injectable } from '@angular/core';
import { Program } from '@shared/Model/program.model';
import { Button } from '@shared/Model/button.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { GroupService } from '@services/group/group.service';
import { ButtonService } from '@services/button/button.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { clone } from '@shared/Method/object.method';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private db: Promise<Dexie>;

  constructor(private groupService: GroupService,
              private buttonService: ButtonService) {

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

  getButtonByProgram(programId: string): Observable<Button[]> {

    return new Observable(subscriber => {

      this.buttonService.getByProgramId(programId).subscribe((buttons) => {

        subscriber.next(buttons);

        subscriber.complete();

      });

    });

  }

  create(program: Program): Observable<Program> {

    return new Observable(subscriber => {

      const cloneProgram = clone(program);

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
