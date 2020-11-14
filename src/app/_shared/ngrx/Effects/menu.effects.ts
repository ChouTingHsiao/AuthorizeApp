import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TableEnum } from '@shared/Enum/table.enum';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { Menu } from '@shared/Model/menu.model';
import { MenuService } from '@services/menu/menu.service';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess} from '@shared/ngrx/Actions/maintain.action';

@Injectable()
export class MenuEffects {

  newData = 'newData';

  loadmenus$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Menus}.${DialogEnum.read}`),
    mergeMap(() => this.menuService.getAll()
      .pipe(
        map(menus => ( new ReadSuccess<Menu>(TableEnum.Menus, menus) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createmenu$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Menus}.${DialogEnum.create}`),
    mergeMap((x) => this.menuService.create(x[this.newData])
      .pipe(
        map(menus => ( new CreateSuccess<Menu>(TableEnum.Menus, menus, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updatemenu$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Menus}.${DialogEnum.edit}`),
    mergeMap((x) => this.menuService.update(x[this.newData])
      .pipe(
        map(menus => ( new EditSuccess<Menu>(TableEnum.Menus, menus, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deletemenu$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Menus}.${DialogEnum.delete}`),
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
