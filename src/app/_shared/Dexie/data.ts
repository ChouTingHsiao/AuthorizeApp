import { User } from '@shared/Model/user.model';
import { Role } from '@shared/Model/role.model';
import { Group } from '@shared/Model/group.model';
import { Program } from '@shared/Model/program.model';
import { Menu } from '@shared/Model/menu.model';
import { Button } from '@shared/Model/button.model';

const Users: User[] = [
    { id: '1', name: 'ADMIN', password: 'ADMIN', role: '1' },
    { id: '2', name: 'USER', password: 'USER', role: '2' },
];

const Roles: Role[] = [
    { id: '1', name: 'ADMIN', remark: '管理員' },
    { id: '2', name: 'USER', remark: '一般使用者' },
];

const Groups: Group[] = [
  { id: '1', name: '管理員群組', role: ['1']},
];

const Programs: Program[] = [
    { id: '1', name: 'User', remark: '使用者', linkTag: 'User', auth: '1' },
    { id: '2', name: 'Role', remark: '角色', linkTag: 'Role', auth: '1' },
    { id: '3', name: 'Group', remark: '群組', linkTag: 'Group', auth: '' },
    { id: '4', name: 'Program', remark: '程式', linkTag: 'Program', auth: '' },
    { id: '5', name: 'Menu', remark: '選單', linkTag: 'Menu', auth: '' },
];

const Menus: Menu[] = [
    { id: '1', name: 'User', program: '1'},
    { id: '2', name: 'Role', program: '2'},
    { id: '3', name: 'Group', program: '3'},
    { id: '4', name: 'Program', program: '4'},
    { id: '5', name: 'Menu', program: '5'},
];

const MenusState = {
    Menus: {
      ids: ['1', '2', '3', '4', '5'],
      entities: {
        1: {
          id: '1',
          name: 'User',
          program: '1'
        },
        2: {
          id: '2',
          name: 'Role',
          program: '2'
        },
        3: {
          id: '3',
          name: 'Group',
          program: '3',
          linkTag: 'Group'
        },
        4: {
          id: '4',
          name: 'Program',
          program: '4',
          linkTag: 'Program'
        },
        5: {
          id: '5',
          name: 'Menu',
          program: '5',
          linkTag: 'Menu'
        }
      },
      selectedUserId: null
    }
};

const Buttons: Button[] = [
  { id: '1', name: 'btnAdd', remark: '新增', program: '1'},
  { id: '2', name: 'btnEdit', remark: '修改', program: '1'},
  { id: '3', name: 'btnDelete', remark: '刪除', program: '1'},
];

export { Users, Roles, Programs, Menus, MenusState, Groups, Buttons };
