import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TableEnum } from '@shared/Enum/table.enum';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { GroupProgram } from '@shared/Model/groupProgram.model';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess } from '@shared/Ngrx/Actions/maintain.action';
import { GroupProgramService } from '@services/groupProgram/groupProgram.service';

@Injectable()
export class GroupProgramEffects {

  newData = 'newData';

  loadGroupPrograms$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.GroupPrograms}.${DialogEnum.read}`),
    mergeMap(() => this.groupProgramService.getAll()
      .pipe(
        map(groupPrograms => ( new ReadSuccess<GroupProgram>(TableEnum.GroupPrograms, groupPrograms) )),
        catchError(() => EMPTY)
      ))
    )
  );

  loadGroupGroupPrograms$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Groups}.${TableEnum.GroupPrograms}.${DialogEnum.read}`),
    mergeMap((x) => this.groupProgramService.getByProgramId(x[this.newData].group)
      .pipe(
        map(groupPrograms => ( new ReadSuccess<GroupProgram>(TableEnum.GroupPrograms, groupPrograms) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createGroupPrograms$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.GroupPrograms}.${DialogEnum.create}`),
    mergeMap((x) => this.groupProgramService.create(x[this.newData])
      .pipe(
        map(groupPrograms => ( new CreateSuccess<GroupProgram>(TableEnum.GroupPrograms, [], groupPrograms) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updateGroupPrograms$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.GroupPrograms}.${DialogEnum.edit}`),
    mergeMap((x) => this.groupProgramService.update(x[this.newData])
      .pipe(
        map(groupPrograms => ( new EditSuccess<GroupProgram>(TableEnum.GroupPrograms, [], groupPrograms) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteGroupPrograms$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.GroupPrograms}.${DialogEnum.delete}`),
    mergeMap((x) => this.groupProgramService.delete(x[this.newData])
      .pipe(
        map(groupPrograms => ( new DeleteSuccess<GroupProgram>(TableEnum.GroupPrograms, [], groupPrograms) )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private groupProgramService: GroupProgramService
  ) {}
}
