import { Action } from '@ngrx/store';
import { DialogEnum } from '@shared/Enum/dialog.enum';


export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export interface MaintainPayload<T> {
  source?: T[];
  newData?: T;
}

export function maintainReducer<T>(state: [], action: ActionWithPayload<MaintainPayload<T>>) {
  const id = 'id';
  switch (action.type) {
    case DialogEnum.read:
      return [...action.payload.source];
    case DialogEnum.create:
      action.payload.newData[id] = (action.payload.source.length + 1).toString();
      return [...action.payload.source, action.payload.newData];
    case DialogEnum.edit:
      action.payload.source = action.payload.source.filter(x => x[id] !== action.payload.newData[id]);
      return [...action.payload.source, action.payload.newData];
    default:
      return state;
  }
}
