import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { RoleService } from '@services/role/role.service';
import { TableEnum } from '@shared/Enum/table.enum';
import { Role } from '@shared/Model/role.model';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess } from '@shared/ngrx/Actions/maintain.action';
import { ROLES_CREATE, ROLES_READ, ROLES_EDIT, ROLES_DELETE} from '@shared/ngrx/Actions/role.action';

@Injectable()
export class RoleEffects {

  newData = 'newData';

  loadRoles$ = createEffect(() => this.actions$.pipe(
    ofType(ROLES_READ),
    mergeMap(() => this.roleService.getAll()
      .pipe(
        map(Roles => ( new ReadSuccess<Role>(TableEnum.Roles, Roles) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createRole$ = createEffect(() => this.actions$.pipe(
    ofType(ROLES_CREATE),
    mergeMap((x) => this.roleService.create(x[this.newData])
      .pipe(
        map(Roles => ( new CreateSuccess<Role>(TableEnum.Roles, Roles, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updateRole$ = createEffect(() => this.actions$.pipe(
    ofType(ROLES_EDIT),
    mergeMap((x) => this.roleService.update(x[this.newData])
      .pipe(
        map(Roles => ( new EditSuccess<Role>(TableEnum.Roles, Roles, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteRole$ = createEffect(() => this.actions$.pipe(
    ofType(ROLES_DELETE),
    mergeMap((x) => this.roleService.delete(x[this.newData])
      .pipe(
        map(Roles => ( new DeleteSuccess<Role>(TableEnum.Roles, Roles, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private roleService: RoleService
  ) {}
}
