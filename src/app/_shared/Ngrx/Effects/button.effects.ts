import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TableEnum } from '@shared/Enum/table.enum';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { Button } from '@shared/Model/button.model';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess } from '@shared/Ngrx/Actions/maintain.action';
import { ButtonService } from '@services/button/button.service';

@Injectable()
export class ButtonEffects {

  newData = 'newData';

  loadButtons$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Buttons}.${DialogEnum.read}`),
    mergeMap(() => this.buttonService.getAll()
      .pipe(
        map(Buttons => ( new ReadSuccess<Button>(TableEnum.Buttons, Buttons) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createButton$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Buttons}.${DialogEnum.create}`),
    mergeMap((x) => this.buttonService.create(x[this.newData])
      .pipe(
        map(Buttons => ( new CreateSuccess<Button>(TableEnum.Buttons, Buttons, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updateButton$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Buttons}.${DialogEnum.edit}`),
    mergeMap((x) => this.buttonService.update(x[this.newData])
      .pipe(
        map(Buttons => ( new EditSuccess<Button>(TableEnum.Buttons, Buttons, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteButton$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Buttons}.${DialogEnum.delete}`),
    mergeMap((x) => this.buttonService.delete(x[this.newData])
      .pipe(
        map(Buttons => ( new DeleteSuccess<Button>(TableEnum.Buttons, Buttons, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private buttonService: ButtonService
  ) {}
}
