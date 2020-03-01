import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '@services/user/user.service';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { TableEnum } from '@shared/Enum/table.enum';

@Injectable()
export class UserEffects {

  payload = 'payload';
  newData = 'newData';

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Users}.${DialogEnum.read}`),
    mergeMap(() => this.userService.getAll()
      .pipe(
        map(Users => ({ type: `${TableEnum.Users}.${DialogEnum.read}.${DialogEnum.success}`, payload: {source: Users} })),
        catchError(() => EMPTY)
      ))
    )
  );

  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Users}.${DialogEnum.create}`),
    mergeMap((x) => this.userService.create(x[this.payload][this.newData])
      .pipe(
        map(Users => ({ type: `${TableEnum.Users}.${DialogEnum.create}.${DialogEnum.success}`, payload: {source: Users} })),
        catchError(() => EMPTY)
      ))
    )
  );

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Users}.${DialogEnum.edit}`),
    mergeMap((x) => this.userService.update(x[this.payload][this.newData])
      .pipe(
        map(Users => ({ type: `${TableEnum.Users}.${DialogEnum.edit}.${DialogEnum.success}`, payload: {source: Users} })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
