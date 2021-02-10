import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TableEnum } from '@shared/Enum/table.enum';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { Role } from '@shared/Model/role.model';
import { RoleService } from '@services/role/role.service';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess } from '@shared/Ngrx/Actions/maintain.action';

@Injectable()
export class RoleEffects {

  newData = 'newData';

  loadRoles$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Roles}.${DialogEnum.read}`),
    mergeMap(() => this.roleService.getAll()
      .pipe(
        map(roles => ( new ReadSuccess<Role>(TableEnum.Roles, roles) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createRole$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Roles}.${DialogEnum.create}`),
    mergeMap((x) => this.roleService.create(x[this.newData])
      .pipe(
        map(role => ( new CreateSuccess<Role>(TableEnum.Roles, [], role) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updateRole$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Roles}.${DialogEnum.edit}`),
    mergeMap((x) => this.roleService.update(x[this.newData])
      .pipe(
        map(role => ( new EditSuccess<Role>(TableEnum.Roles, [], role) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteRole$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Roles}.${DialogEnum.delete}`),
    mergeMap((x) => this.roleService.delete(x[this.newData])
      .pipe(
        map(role => ( new DeleteSuccess<Role>(TableEnum.Roles, [], role) )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private roleService: RoleService
  ) {}
}
