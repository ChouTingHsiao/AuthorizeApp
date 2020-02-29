import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProgramService } from '@services/program/program.service';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { TableEnum } from '@shared/Enum/table.enum';

@Injectable()
export class ProgramEffects {

  loadPrograms$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Programs}.${DialogEnum.read}`),
    mergeMap(() => this.programService.getAll()
      .pipe(
        map(Programs => ({ type: '[Programs API] Programs Loaded Success', payload: Programs })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private programService: ProgramService
  ) {}
}
