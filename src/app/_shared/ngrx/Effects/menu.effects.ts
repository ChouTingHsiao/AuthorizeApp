import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MenuService } from '@services/menu/menu.service';
import { TableEnum } from '@shared/Enum/table.enum';
import { Menu } from '@shared/Model/menu.model';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess} from '@shared/ngrx/Actions/maintain.action';
import { MENUS_CREATE, MENUS_READ, MENUS_EDIT, MENUS_DELETE} from '@shared/ngrx/Actions/menu.action';

@Injectable()
export class MenuEffects {

  newData = 'newData';

  loadmenus$ = createEffect(() => this.actions$.pipe(
    ofType(MENUS_READ),
    mergeMap(() => this.menuService.getAll()
      .pipe(
        map(menus => ( new ReadSuccess<Menu>(TableEnum.Menus, menus) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createmenu$ = createEffect(() => this.actions$.pipe(
    ofType(MENUS_CREATE),
    mergeMap((x) => this.menuService.create(x[this.newData])
      .pipe(
        map(menus => ( new CreateSuccess<Menu>(TableEnum.Menus, menus, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updatemenu$ = createEffect(() => this.actions$.pipe(
    ofType(MENUS_EDIT),
    mergeMap((x) => this.menuService.update(x[this.newData])
      .pipe(
        map(menus => ( new EditSuccess<Menu>(TableEnum.Menus, menus, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deletemenu$ = createEffect(() => this.actions$.pipe(
    ofType(MENUS_DELETE),
    mergeMap((x) => this.menuService.delete(x[this.newData])
      .pipe(
        map(menus => ( new DeleteSuccess<Menu>(TableEnum.Menus, menus, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private menuService: MenuService
  ) {}
}
