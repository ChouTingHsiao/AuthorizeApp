import { Action } from '@ngrx/store';
import { DialogEnum } from '@shared/Enum/dialog.enum';


export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export interface MaintainPayload<T> {
  name: string;
  source?: T[];
  newData?: T;
}

export function maintainReducer<T>(tableName: string) {

  const id = 'id';

  let newData;

  return function reducer( state: [], action: ActionWithPayload<MaintainPayload<T>> ) {
    switch (action.type) {

      case  `${tableName}.${DialogEnum.read}.${DialogEnum.success}`:
        return [...action.payload.source];

      case  `${tableName}.${DialogEnum.create}`:
        action.payload.newData[id] = (action.payload.source.length + 1).toString();
        newData = [...action.payload.source, action.payload.newData];
        localStorage.setItem(action.payload.name, JSON.stringify(newData));
        return newData;

      case  `${tableName}.${DialogEnum.edit}`:
        action.payload.source = action.payload.source.filter(x => x[id] !== action.payload.newData[id]);
        newData = [...action.payload.source, action.payload.newData];
        localStorage.setItem(action.payload.name, JSON.stringify(newData));
        return newData;

      default:
        return state;
    }
  };
}
