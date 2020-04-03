import { MaintainSuccessActions,
         CREATESUCCESS, READSUCCESS, EDITSUCCESS, DELETESUCCESS} from '@shared/ngrx/Actions/maintain.action';

export function maintainReducer<T>(tableName: string) {

    const initialState = [];

    function reducer(state: T[] = initialState, action: MaintainSuccessActions<T>) {
      switch (action.type) {

        case  READSUCCESS:
          return [...action.source];

        case  CREATESUCCESS:
          return [...action.source];

        case  EDITSUCCESS:
          return [...action.source];

        case  DELETESUCCESS:
          return [...action.source];

        default:
          return state;
      }
    }

    return (state: T[] = initialState, action: MaintainSuccessActions<T>) => {
      switch (action.actionPrefix) {
        case tableName:
          return reducer(state, action);
        default:
          return state;
      }
    };
}
