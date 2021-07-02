import { User } from '@shared/Model/user.model';
import { Role } from '@shared/Model/role.model';
import { Group } from '@shared/Model/group.model';
import { GroupProgram } from '@shared/Model/groupProgram.model';
import { Program } from '@shared/Model/program.model';
import { Button } from '@shared/Model/button.model';
import { Menu } from '@shared/Model/menu.model';

const Users: User[] = [
    { id: '1', name: 'ADMIN', password: 'ADMIN', role: '1' },
    { id: '2', name: 'USER', password: 'USER', role: '2' },
];

const Roles: Role[] = [
    { id: '1', name: 'ADMIN', remark: '管理員' },
    { id: '2', name: 'USER', remark: '一般使用者' },
];

const Groups: Group[] = [
  { id: '1', name: '管理員群組', roles: ['1']},
  { id: '2', name: '一般群組', roles: ['2']},
];

const GroupPrograms: GroupProgram[] = [
  { id: '1', name: 'User', program: '1',  linkTag: 'User', buttons: ['1', '2', '3'], group: '1' },
  { id: '2', name: 'Role', program: '2', linkTag: 'Role', buttons: ['4', '5', '6'], group: '1' },
  { id: '3', name: 'Group', program: '3', linkTag: 'Group', buttons: ['7', '8', '9'], group: '1' },
  { id: '4', name: 'Program', program: '4', linkTag: 'Program', buttons: ['10', '11', '12'], group: '1' },
  { id: '5', name: 'Menu', program: '5', linkTag: 'Menu', buttons: ['13', '14', '15'], group: '1' },
  { id: '6', name: 'Role', program: '2', linkTag: 'Role', buttons: [], group: '2' },
  { id: '7', name: 'Group', program: '3', linkTag: 'Group', buttons: [], group: '2' },
  { id: '8', name: 'Program', program: '4', linkTag: 'Program', buttons: [], group: '2' },
];

const Programs: Program[] = [
    { id: '1', name: 'User', remark: '使用者', linkTag: 'User', auth: '1' },
    { id: '2', name: 'Role', remark: '角色', linkTag: 'Role', auth: '1' },
    { id: '3', name: 'Group', remark: '群組', linkTag: 'Group', auth: '' },
    { id: '4', name: 'Program', remark: '程式', linkTag: 'Program', auth: '' },
    { id: '5', name: 'Menu', remark: '選單', linkTag: 'Menu', auth: '' },
];

const Buttons: Button[] = [
  { id: '1', name: 'btnAdd', remark: '新增', program: '1' },
  { id: '2', name: 'btnEdit', remark: '修改', program: '1' },
  { id: '3', name: 'btnDelete', remark: '刪除', program: '1' },
  { id: '4', name: 'btnAdd', remark: '新增', program: '2' },
  { id: '5', name: 'btnEdit', remark: '修改', program: '2' },
  { id: '6', name: 'btnDelete', remark: '刪除', program: '2' },
  { id: '7', name: 'btnAdd', remark: '新增', program: '3' },
  { id: '8', name: 'btnEdit', remark: '修改', program: '3' },
  { id: '9', name: 'btnDelete', remark: '刪除', program: '3' },
  { id: '10', name: 'btnAdd', remark: '新增', program: '4' },
  { id: '11', name: 'btnEdit', remark: '修改', program: '4' },
  { id: '12', name: 'btnDelete', remark: '刪除', program: '4' },
  { id: '13', name: 'btnAdd', remark: '新增', program: '5' },
  { id: '14', name: 'btnEdit', remark: '修改', program: '5' },
  { id: '15', name: 'btnDelete', remark: '刪除', program: '5' },
];

const Menus: Menu[] = [
    { id: '1', name: 'User', program: '1', buttons: ['1', '2', '3'] },
    { id: '2', name: 'Role', program: '2', buttons: ['4', '5', '6'] },
    { id: '3', name: 'Group', program: '3', buttons: ['7', '8', '9'] },
    { id: '4', name: 'Program', program: '4', buttons: ['10', '11', '12'] },
    { id: '5', name: 'Menu', program: '5', buttons: ['13', '14', '15'] },
];

export { Users, Roles, Groups, GroupPrograms, Programs, Buttons, Menus };
