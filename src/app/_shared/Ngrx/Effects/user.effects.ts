import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TableEnum } from '@shared/Enum/table.enum';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { User } from '@shared/Model/user.model';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess } from '@shared/Ngrx/Actions/maintain.action';
import { UserService } from '@services/user/user.service';

@Injectable()
export class UserEffects {

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
    mergeMap((x) => this.userService.create(x[this.newData])
      .pipe(
        map(Users => ( new CreateSuccess<User>(TableEnum.Users, Users, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Users}.${DialogEnum.edit}`),
    mergeMap((x) => this.userService.update(x[this.newData])
      .pipe(
        map(Users => ( new EditSuccess<User>(TableEnum.Users, Users, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Users}.${DialogEnum.delete}`),
    mergeMap((x) => this.userService.delete(x[this.newData])
      .pipe(
        map(Users => ( new DeleteSuccess<User>(TableEnum.Users, Users, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
