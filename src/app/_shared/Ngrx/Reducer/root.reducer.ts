import { InjectionToken } from '@angular/core';
import { maintainReducer} from '@shared/Ngrx/Reducer/maintain.reducer';
import { TableEnum } from '@shared/Enum/table.enum';
import { Group } from '@shared/Model/group.model';
import { Program } from '@shared/Model/program.model';
import { Role } from '@shared/Model/role.model';
import { User } from '@shared/Model/user.model';
import { Menu } from '@shared/Model/menu.model';
import { Button } from '@shared/Model/button.model';

export const ROOT_REDUCER = new InjectionToken<any>('Root Reducer', {factory: () => ({
      Users: maintainReducer<User>(TableEnum.Users),
      Roles: maintainReducer<Role>(TableEnum.Roles),
      Groups: maintainReducer<Group>(TableEnum.Groups),
      Programs: maintainReducer<Program>(TableEnum.Programs),
      Menus: maintainReducer<Menu>(TableEnum.Menus),
      Buttons: maintainReducer<Button>(TableEnum.Buttons),
    })
});
