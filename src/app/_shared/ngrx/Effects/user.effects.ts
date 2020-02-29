import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '@services/user/user.service';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { TableEnum } from '@shared/Enum/table.enum';

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Users}.${DialogEnum.read}`),
    mergeMap(() => this.userService.getAll()
      .pipe(
        map(Users => ({ type: '[Users API] Users Loaded Success', payload: Users })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
