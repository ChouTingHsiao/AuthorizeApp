import { MaintainSuccessActions,
         CREATE_SUCCESS, READ_SUCCESS, EDIT_SUCCESS, DELETE_SUCCESS} from '@shared/Ngrx/Actions/maintain.action';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';

interface State<T> extends EntityState<T> {
  // additional entities state properties
  selectedUserId: number | null;
}

export function maintainReducer<T>(tableName: string) {

  const key = 'id';

  const adapter: EntityAdapter<T> = createEntityAdapter<T>();

  const initialState: State<T> = adapter.getInitialState({
    // additional entity state properties
    selectedUserId: null,
  });
  // const initialState = [];

  function reducer(state: State<T>  = initialState, action: MaintainSuccessActions<T>) {
    switch (action.type) {

      case  READ_SUCCESS:
        return adapter.setAll(action.source, state);

      case  CREATE_SUCCESS:
        return adapter.addOne(action.newData, state);

      case  EDIT_SUCCESS:
        const entity: Update<T> =  Object.assign({}, {id: action.newData[key], changes: action.newData});
        return adapter.updateOne(entity, state);

      case  DELETE_SUCCESS:
        return adapter.removeOne(action.newData[key], state);

      default:
        return state;
    }
  }

  return (state: State<T> = initialState, action: MaintainSuccessActions<T>) => {
    switch (action.actionPrefix) {
      case tableName:
        return reducer(state, action);
      default:
        return state;
    }
  };
}
