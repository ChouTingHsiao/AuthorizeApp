import { MaintainSuccessActions,
         CREATE_SUCCESS, READ_SUCCESS, EDIT_SUCCESS, DELETE_SUCCESS} from '@shared/ngrx/Actions/maintain.action';

export function maintainReducer<T>(tableName: string) {

    const initialState = [];

    function reducer(state: T[] = initialState, action: MaintainSuccessActions<T>) {
      switch (action.type) {

        case  READ_SUCCESS:
          return [...action.source];

        case  CREATE_SUCCESS:
          return [...action.source];

        case  EDIT_SUCCESS:
          return [...action.source];

        case  DELETE_SUCCESS:
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
