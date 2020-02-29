import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { RoleService } from '@services/role/role.service';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { TableEnum } from '@shared/Enum/table.enum';

@Injectable()
export class RoleEffects {

  loadRoles$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Roles}.${DialogEnum.read}`),
    mergeMap(() => this.roleService.getAll()
      .pipe(
        map(Roles => ({ type: '[Roles API] Roles Loaded Success', payload: Roles })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private roleService: RoleService
  ) {}
}
