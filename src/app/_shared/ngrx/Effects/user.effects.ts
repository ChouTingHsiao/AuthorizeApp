import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '@services/user/user.service';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { User } from '@shared/Model/user.model';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess } from '@shared/ngrx/Actions/maintain.action';

@Injectable()
export class UserEffects {

  payload = 'payload';
  newData = 'newData';

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Users}.${DialogEnum.read}`),
    mergeMap(() => this.userService.getAll()
      .pipe(
        map(Users => ( new ReadSuccess<User>(TableEnum.Users, Users) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Users}.${DialogEnum.create}`),
    mergeMap((x) => this.userService.create(x[this.payload][this.newData])
      .pipe(
        map(Users => ( new CreateSuccess<User>(TableEnum.Users, Users) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Users}.${DialogEnum.edit}`),
    mergeMap((x) => this.userService.update(x[this.payload][this.newData])
      .pipe(
        map(Users => ( new EditSuccess<User>(TableEnum.Users, Users) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Users}.${DialogEnum.delete}`),
    mergeMap((x) => this.userService.delete(x[this.payload][this.newData])
      .pipe(
        map(Users => ( new DeleteSuccess<User>(TableEnum.Users, Users) )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
