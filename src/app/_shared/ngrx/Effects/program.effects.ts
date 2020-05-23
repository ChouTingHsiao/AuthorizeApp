import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProgramService } from '@services/program/program.service';
import { TableEnum } from '@shared/Enum/table.enum';
import { Program } from '@shared/Model/program.model';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess } from '@shared/ngrx/Actions/maintain.action';
import { PROGRAMS_CREATE, PROGRAMS_READ, PROGRAMS_EDIT, PROGRAMS_DELETE} from '@shared/ngrx/Actions/program.action';

@Injectable()
export class ProgramEffects {

  newData = 'newData';

  loadPrograms$ = createEffect(() => this.actions$.pipe(
    ofType(PROGRAMS_READ),
    mergeMap(() => this.programService.getAll()
      .pipe(
        map(Programs => ( new ReadSuccess<Program>(TableEnum.Programs, Programs) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createProgram$ = createEffect(() => this.actions$.pipe(
    ofType(PROGRAMS_CREATE),
    mergeMap((x) => this.programService.create(x[this.newData])
      .pipe(
        map(Programs => ( new CreateSuccess<Program>(TableEnum.Programs, Programs, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updateProgram$ = createEffect(() => this.actions$.pipe(
    ofType(PROGRAMS_EDIT),
    mergeMap((x) => this.programService.update(x[this.newData])
      .pipe(
        map(Programs => ( new EditSuccess<Program>(TableEnum.Programs, Programs, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteProgram$ = createEffect(() => this.actions$.pipe(
    ofType(PROGRAMS_DELETE),
    mergeMap((x) => this.programService.delete(x[this.newData])
      .pipe(
        map(Programs => ( new DeleteSuccess<Program>(TableEnum.Programs, Programs, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private programService: ProgramService
  ) {}
}
