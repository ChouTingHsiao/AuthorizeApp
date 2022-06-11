import { InjectionToken } from '@angular/core';
import { maintainReducer} from '@shared/Ngrx/Reducer/maintain.reducer';
import { TableEnum } from '@shared/Enum/table.enum';
import { Group } from '@shared/Model/group.model';
import { GroupProgram } from '@shared/Model/groupProgram.model';
import { Program } from '@shared/Model/program.model';
import { Role } from '@shared/Model/role.model';
import { User } from '@shared/Model/user.model';
import { Menu } from '@shared/Model/menu.model';
import { Button } from '@shared/Model/button.model';

export const ROOT_REDUCER = new InjectionToken<unknown>('Root Reducer', {factory: () => ({
      Users: maintainReducer<User>(TableEnum.Users),
      Roles: maintainReducer<Role>(TableEnum.Roles),
      Groups: maintainReducer<Group>(TableEnum.Groups),
      GroupPrograms: maintainReducer<GroupProgram>(TableEnum.GroupPrograms),
      Programs: maintainReducer<Program>(TableEnum.Programs),
      Buttons: maintainReducer<Button>(TableEnum.Buttons),
      Menus: maintainReducer<Menu>(TableEnum.Menus),
    })
});
