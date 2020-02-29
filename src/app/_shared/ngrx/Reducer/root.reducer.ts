import { InjectionToken } from '@angular/core';
import { maintainReducer} from '@shared/ngrx/Reducer/maintain.reducer';
import { TableEnum } from '@shared/Enum/table.enum';

export const ROOT_REDUCER = new InjectionToken<any>('Root Reducer', {factory: () => ({
      Users: maintainReducer(TableEnum.Users),
      Roles: maintainReducer(TableEnum.Roles),
      Groups: maintainReducer(TableEnum.Groups),
      Programs: maintainReducer(TableEnum.Programs),
    })
});
