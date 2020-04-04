import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { GroupService } from '@services/group/group.service';
import { TableEnum } from '@shared/Enum/table.enum';
import { Group } from '@shared/Model/group.model';
import { CreateSuccess, ReadSuccess, EditSuccess, DeleteSuccess} from '@shared/ngrx/Actions/maintain.action';
import { GROUPS_CREATE, GROUPS_READ, GROUPS_EDIT, GROUPS_DELETE} from '@shared/ngrx/Actions/group.action';

@Injectable()
export class GroupEffects {

  newData = 'newData';

  loadGroups$ = createEffect(() => this.actions$.pipe(
    ofType(GROUPS_READ),
    mergeMap(() => this.groupService.getAll()
      .pipe(
        map(Groups => ( new ReadSuccess<Group>(TableEnum.Groups, Groups) )),
        catchError(() => EMPTY)
      ))
    )
  );

  createGroup$ = createEffect(() => this.actions$.pipe(
    ofType(GROUPS_CREATE),
    mergeMap((x) => this.groupService.create(x[this.newData])
      .pipe(
        map(Groups => ( new CreateSuccess<Group>(TableEnum.Groups, Groups) )),
        catchError(() => EMPTY)
      ))
    )
  );

  updateGroup$ = createEffect(() => this.actions$.pipe(
    ofType(GROUPS_EDIT),
    mergeMap((x) => this.groupService.update(x[this.newData])
      .pipe(
        map(Groups => ( new EditSuccess<Group>(TableEnum.Groups, Groups) )),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteGroup$ = createEffect(() => this.actions$.pipe(
    ofType(GROUPS_DELETE),
    mergeMap((x) => this.groupService.delete(x[this.newData])
      .pipe(
        map(Groups => ( new DeleteSuccess<Group>(TableEnum.Groups, Groups) )),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private groupService: GroupService
  ) {}
}
