import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { GroupService } from '@services/group/group.service';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { TableEnum } from '@shared/Enum/table.enum';

@Injectable()
export class GroupEffects {

  loadGroups$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Groups}.${DialogEnum.read}`),
    mergeMap(() => this.groupService.getAll()
      .pipe(
        map(Groups => ({ type: `${TableEnum.Groups}.${DialogEnum.read}.${DialogEnum.success}`, payload: {source: Groups} })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private groupService: GroupService
  ) {}
}
