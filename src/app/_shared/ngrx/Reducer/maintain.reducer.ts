import { Action } from '@ngrx/store';
import { DialogEnum } from '@shared/Enum/dialog.enum';


export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export interface MaintainPayload<T> {
  source?: T[];
  newData?: T;
}

export function maintainReducer<T>(tableName: string) {

  return function reducer( state: [], action: ActionWithPayload<MaintainPayload<T>> ) {
    switch (action.type) {

      case  `${tableName}.${DialogEnum.read}.${DialogEnum.success}`:
        return [...action.payload.source];

      case  `${tableName}.${DialogEnum.create}.${DialogEnum.success}`:
        return [...action.payload.source];

      case  `${tableName}.${DialogEnum.edit}.${DialogEnum.success}`:
        return [...action.payload.source];

      default:
        return state;
    }
  };
}
