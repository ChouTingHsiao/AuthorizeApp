import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { GroupService } from '@services/group/group.service';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { TableEnum } from '@shared/Enum/table.enum';

@Injectable()
export class GroupEffects {

  payload = 'payload';
  newData = 'newData';

  loadGroups$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Groups}.${DialogEnum.read}`),
    mergeMap(() => this.groupService.getAll()
      .pipe(
        map(Groups => ({ type: `${TableEnum.Groups}.${DialogEnum.read}.${DialogEnum.success}`, payload: {source: Groups} })),
        catchError(() => EMPTY)
      ))
    )
  );

  createGroup$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Groups}.${DialogEnum.create}`),
    mergeMap((x) => this.groupService.create(x[this.payload][this.newData])
      .pipe(
        map(Groups => ({ type: `${TableEnum.Groups}.${DialogEnum.create}.${DialogEnum.success}`, payload: {source: Groups} })),
        catchError(() => EMPTY)
      ))
    )
  );

  updateGroup$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Groups}.${DialogEnum.edit}`),
    mergeMap((x) => this.groupService.update(x[this.payload][this.newData])
      .pipe(
        map(Groups => ({ type: `${TableEnum.Groups}.${DialogEnum.edit}.${DialogEnum.success}`, payload: {source: Groups} })),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteGroup$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Groups}.${DialogEnum.delete}`),
    mergeMap((x) => this.groupService.delete(x[this.payload][this.newData])
      .pipe(
        map(Groups => ({ type: `${TableEnum.Groups}.${DialogEnum.delete}.${DialogEnum.success}`, payload: {source: Groups} })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private groupService: GroupService
  ) {}
}
