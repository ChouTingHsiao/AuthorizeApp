import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TableEnum } from '@shared/Enum/table.enum';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { Program } from '@shared/Model/program.model';
import { ProgramService } from '@services/program/program.service';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess } from '@shared/Ngrx/Actions/maintain.action';

@Injectable()
export class ProgramEffects {

  newData = 'newData';

  loadPrograms$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Programs}.${DialogEnum.read}`),
    mergeMap(() => this.programService.getAll()
      .pipe(
        map(programs => ( new ReadSuccess<Program>(TableEnum.Programs, programs) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createProgram$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Programs}.${DialogEnum.create}`),
    mergeMap((x) => this.programService.create(x[this.newData])
      .pipe(
        map(program => ( new CreateSuccess<Program>(TableEnum.Programs, [], program) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updateProgram$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Programs}.${DialogEnum.edit}`),
    mergeMap((x) => this.programService.update(x[this.newData])
      .pipe(
        map(program => ( new EditSuccess<Program>(TableEnum.Programs, [], program) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteProgram$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Programs}.${DialogEnum.delete}`),
    mergeMap((x) => this.programService.delete(x[this.newData])
      .pipe(
        map(program => ( new DeleteSuccess<Program>(TableEnum.Programs, [], program) )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private programService: ProgramService
  ) {}
}
