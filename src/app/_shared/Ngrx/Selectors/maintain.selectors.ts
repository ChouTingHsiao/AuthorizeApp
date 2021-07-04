import { createFeatureSelector } from '@ngrx/store';
import { State } from '@shared/Ngrx/Reducer/maintain.reducer';
import { TableEnum } from '@shared/Enum/table.enum';
import { User } from '@shared/Model/user.model';
import { Role } from '@shared/Model/role.model';
import { Group } from '@shared/Model/group.model';
import { GroupProgram } from '@shared/Model/groupProgram.model';
import { Program } from '@shared/Model/program.model';
import { Button } from '@shared/Model/button.model';
import { Menu } from '@shared/Model/menu.model';

export const getUsersState = createFeatureSelector<State<User>>(TableEnum.Users);
export const getRolesState = createFeatureSelector<State<Role>>(TableEnum.Roles);
export const getGroupsState = createFeatureSelector<State<Group>>(TableEnum.Groups);
export const getGroupProgramsState = createFeatureSelector<State<GroupProgram>>(TableEnum.GroupPrograms);
export const getProgramsState = createFeatureSelector<State<Program>>(TableEnum.Programs);
export const getButtonsState = createFeatureSelector<State<Button>>(TableEnum.Buttons);
export const getMenusState = createFeatureSelector<State<Menu>>(TableEnum.Menus);
