import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProgramService } from '@services/program/program.service';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { TableEnum } from '@shared/Enum/table.enum';

@Injectable()
export class ProgramEffects {

  payload = 'payload';
  newData = 'newData';

  loadPrograms$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Programs}.${DialogEnum.read}`),
    mergeMap(() => this.programService.getAll()
      .pipe(
        map(Programs => ({ type: `${TableEnum.Programs}.${DialogEnum.read}.${DialogEnum.success}`, payload: {source: Programs} })),
        catchError(() => EMPTY)
      ))
    )
  );

  createProgram$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Programs}.${DialogEnum.create}`),
    mergeMap((x) => this.programService.create(x[this.payload][this.newData])
      .pipe(
        map(Programs => ({ type: `${TableEnum.Programs}.${DialogEnum.create}.${DialogEnum.success}`, payload: {source: Programs} })),
        catchError(() => EMPTY)
      ))
    )
  );

  updateProgram$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Programs}.${DialogEnum.edit}`),
    mergeMap((x) => this.programService.update(x[this.payload][this.newData])
      .pipe(
        map(Programs => ({ type: `${TableEnum.Programs}.${DialogEnum.edit}.${DialogEnum.success}`, payload: {source: Programs} })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private programService: ProgramService
  ) {}
}
