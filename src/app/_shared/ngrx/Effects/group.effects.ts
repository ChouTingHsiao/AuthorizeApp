import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TableEnum } from '@shared/Enum/table.enum';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { Group } from '@shared/Model/group.model';
import { GroupService } from '@services/group/group.service';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess} from '@shared/ngrx/Actions/maintain.action';

@Injectable()
export class GroupEffects {

  newData = 'newData';

  loadGroups$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Groups}.${DialogEnum.read}`),
    mergeMap(() => this.groupService.getAll()
      .pipe(
        map(Groups => ( new ReadSuccess<Group>(TableEnum.Groups, Groups) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createGroup$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Groups}.${DialogEnum.create}`),
    mergeMap((x) => this.groupService.create(x[this.newData])
      .pipe(
        map(Groups => ( new CreateSuccess<Group>(TableEnum.Groups, Groups, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updateGroup$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Groups}.${DialogEnum.edit}`),
    mergeMap((x) => this.groupService.update(x[this.newData])
      .pipe(
        map(Groups => ( new EditSuccess<Group>(TableEnum.Groups, Groups, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteGroup$ = createEffect(() => this.actions$.pipe(
    ofType(`${TableEnum.Groups}.${DialogEnum.delete}`),
    mergeMap((x) => this.groupService.delete(x[this.newData])
      .pipe(
        map(Groups => ( new DeleteSuccess<Group>(TableEnum.Groups, Groups, x[this.newData]) )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private groupService: GroupService
  ) {}
}
