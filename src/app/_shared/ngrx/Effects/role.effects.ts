import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { RoleService } from '@services/role/role.service';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Role } from '@shared/Model/role.model';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess } from '@shared/ngrx/Actions/maintain.action';

@Injectable()
export class RoleEffects {

  payload = 'payload';
  newData = 'newData';

  loadRoles$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Roles}.${DialogEnum.read}`),
    mergeMap(() => this.roleService.getAll()
      .pipe(
        map(Roles => ( new ReadSuccess<Role>(TableEnum.Roles, Roles) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createRole$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Roles}.${DialogEnum.create}`),
    mergeMap((x) => this.roleService.create(x[this.payload][this.newData])
      .pipe(
        map(Roles => ( new CreateSuccess<Role>(TableEnum.Roles, Roles) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updateRole$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Roles}.${DialogEnum.edit}`),
    mergeMap((x) => this.roleService.update(x[this.payload][this.newData])
      .pipe(
        map(Roles => ( new EditSuccess<Role>(TableEnum.Roles, Roles) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteRole$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Roles}.${DialogEnum.delete}`),
    mergeMap((x) => this.roleService.delete(x[this.payload][this.newData])
      .pipe(
        map(Roles => ( new DeleteSuccess<Role>(TableEnum.Roles, Roles) )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private roleService: RoleService
  ) {}
}
