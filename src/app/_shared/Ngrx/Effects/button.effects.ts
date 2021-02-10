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
        map(buttons => ( new ReadSuccess<Button>(TableEnum.Buttons, buttons) )),
        catchError(() => EMPTY)
      ))
    )
  );

  loadProgramButtons$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Programs}.${TableEnum.Buttons}.${DialogEnum.read}`),
    mergeMap((x) => this.buttonService.getByProgramId(x[this.newData].program)
      .pipe(
        map(buttons => ( new ReadSuccess<Button>(TableEnum.Buttons, buttons) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createButton$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Buttons}.${DialogEnum.create}`),
    mergeMap((x) => this.buttonService.create(x[this.newData])
      .pipe(
        map(button => ( new CreateSuccess<Button>(TableEnum.Buttons, [], button) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updateButton$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Buttons}.${DialogEnum.edit}`),
    mergeMap((x) => this.buttonService.update(x[this.newData])
      .pipe(
        map(button => ( new EditSuccess<Button>(TableEnum.Buttons, [], button) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteButton$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Buttons}.${DialogEnum.delete}`),
    mergeMap((x) => this.buttonService.delete(x[this.newData])
      .pipe(
        map(button => ( new DeleteSuccess<Button>(TableEnum.Buttons, [], button) )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private buttonService: ButtonService
  ) {}
}
