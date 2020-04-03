import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProgramService } from '@services/program/program.service';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Program } from '@shared/Model/program.model';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess } from '@shared/ngrx/Actions/maintain.action';

@Injectable()
export class ProgramEffects {

  payload = 'payload';
  newData = 'newData';

  loadPrograms$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Programs}.${DialogEnum.read}`),
    mergeMap(() => this.programService.getAll()
      .pipe(
        map(Programs => ( new ReadSuccess<Program>(TableEnum.Programs, Programs) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createProgram$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Programs}.${DialogEnum.create}`),
    mergeMap((x) => this.programService.create(x[this.payload][this.newData])
      .pipe(
        map(Programs => ( new CreateSuccess<Program>(TableEnum.Programs, Programs) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updateProgram$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Programs}.${DialogEnum.edit}`),
    mergeMap((x) => this.programService.update(x[this.payload][this.newData])
      .pipe(
        map(Programs => ( new EditSuccess<Program>(TableEnum.Programs, Programs) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteProgram$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Programs}.${DialogEnum.delete}`),
    mergeMap((x) => this.programService.delete(x[this.payload][this.newData])
      .pipe(
        map(Programs => ( new DeleteSuccess<Program>(TableEnum.Programs, Programs) )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private programService: ProgramService
  ) {}
}
