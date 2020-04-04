import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '@services/user/user.service';
import { TableEnum } from '@shared/Enum/table.enum';
import { User } from '@shared/Model/user.model';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess } from '@shared/ngrx/Actions/maintain.action';
import { USERS_CREATE, USERS_READ, USERS_EDIT, USERS_DELETE} from '@shared/ngrx/Actions/user.action';

@Injectable()
export class UserEffects {

  newData = 'newData';

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(USERS_READ),
    mergeMap(() => this.userService.getAll()
      .pipe(
        map(Users => ( new ReadSuccess<User>(TableEnum.Users, Users) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(USERS_CREATE),
    mergeMap((x) => this.userService.create(x[this.newData])
      .pipe(
        map(Users => ( new CreateSuccess<User>(TableEnum.Users, Users) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(USERS_EDIT),
    mergeMap((x) => this.userService.update(x[this.newData])
      .pipe(
        map(Users => ( new EditSuccess<User>(TableEnum.Users, Users) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(USERS_DELETE),
    mergeMap((x) => this.userService.delete(x[this.newData])
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
