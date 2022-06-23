// db.ts
import Dexie, { Table } from 'dexie';
import { User } from '@shared/Model/user.model';
import { Role } from '@shared/Model/role.model';
import { Group } from '@shared/Model/group.model';
import { GroupProgram } from '@shared/Model/groupProgram.model';
import { Program } from '@shared/Model/program.model';
import { Button } from '@shared/Model/button.model';
import { Menu } from '@shared/Model/menu.model';
import { Users, Roles, Groups, GroupPrograms, Programs, Buttons, Menus } from '@src/app/_shared/Dexie/authorize.data';

export class AuthorizeDb extends Dexie {
  
  Users!: Table<User, string>;
  
  Roles!: Table<Role, string>;
  
  Groups!: Table<Group, string>;
  
  GroupPrograms!: Table<GroupProgram, string>;
  
  Programs!: Table<Program, string>;
  
  Buttons!: Table<Button, string>;
  
  Menus!: Table<Menu, string>;

  constructor() {
    super('authorizeApp');
    this.version(2).stores({
      Users: 'id, name, password, role',
      Roles: 'id, name, remark',
      Groups: 'id, name, role',
      GroupPrograms: 'id, name, program, buttons, group',
      Programs: 'id, name, remark, linkTag, auth',
      Buttons: 'id, name, remark, program',
      Menus: 'id, name, program, buttons',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {

    await authorizeDb.Users.bulkAdd(Users);

    await authorizeDb.Roles.bulkAdd(Roles);

    await authorizeDb.Groups.bulkAdd(Groups);

    await authorizeDb.GroupPrograms.bulkAdd(GroupPrograms);

    await authorizeDb.Programs.bulkAdd(Programs);

    await authorizeDb.Buttons.bulkAdd(Buttons);

    await authorizeDb.Menus.bulkAdd(Menus);
  }
}

export const authorizeDb = new AuthorizeDb();
