import Dexie from 'dexie';
import { TableEnum } from '@shared/Enum/table.enum';
import { User } from '@shared/Model/user.model';
import { Role } from '@shared/Model/role.model';
import { Program } from '@shared/Model/program.model';
import { Menu } from '@shared/Model/menu.model';
import { Group } from '@shared/Model/group.model';

function OpenDB(): Promise<Dexie> {
    const AuthorizeDb = new Dexie('Authorize');

    AuthorizeDb.version(1).stores({
      Users: 'id, name, password, role',
      Roles: 'id, name, remark',
      Groups: 'id, name, role',
      Programs: 'id, name, remark, linkTag, auth',
      Menus: 'id, name, program'
    });
    
    const Users: User[] = [
        { id: '1', name: 'ADMIN', password: 'ADMIN', role: '1' },
        { id: '2', name: 'USER', password: 'USER', role: '2' }
    ];

    TableInit(AuthorizeDb, TableEnum.Users, Users);

    const Roles: Role[] = [
        { id: '1', name: 'ADMIN', remark: '管理員' },
        { id: '2', name: 'USER', remark: '一般使用者' }
    ];
    
    TableInit(AuthorizeDb, TableEnum.Roles, Roles);

    const Programs: Program[] = [
        { id: '1', name: 'User', remark: '使用者', linkTag: 'User', auth: '1' },
        { id: '2', name: 'Role', remark: '角色', linkTag: 'Role', auth: '1' },
        { id: '3', name: 'Group', remark: '群組', linkTag: 'Group', auth: '' },
        { id: '4', name: 'Program', remark: '程式', linkTag: 'Program', auth: '' },
        { id: '5', name: 'Menu', remark: '選單', linkTag: 'Menu', auth: '' },
    ];

    TableInit(AuthorizeDb, TableEnum.Programs, Programs);

    const Menus: Menu[] = [
        { id: '1', name: 'User', program: '1'},
        { id: '2', name: 'Role', program: '2'},
        { id: '3', name: 'Group', program: '3'},
        { id: '4', name: 'Program', program: '4'},
        { id: '5', name: 'Menu', program: '5'},
    ];

    TableInit(AuthorizeDb, TableEnum.Menus, Menus);

    const Groups: Group[] = [
        { id: '1', name: '管理員群組', role: ['1']}
    ];
    
    TableInit(AuthorizeDb, TableEnum.Groups, Groups);
    
    return AuthorizeDb.open();
}

function TableInit(db: Dexie, table: string, data: any[]): void {

    db.transaction('rw', db.table(table), () => {

        db.table(table).count().then(x => {
            if (x < 1) {
                db.table(table).bulkAdd(data).catch(Dexie.BulkError, (e) => {
                    console.error(`${table} bulkAdd fail. ${e}`);
                });
            }
        })

    }).then(result => {
    
        console.info(`transaction success: ${result}`);
    
    }).catch(error => {
    
        console.error(`transaction fail: ${error}`);
    
    });
}

function GetAll(db: Promise<Dexie>, table: string): Promise<any[]> {
    return db.then( x => {
       return x.table(table).toArray();
    });
}

function TableAdd(db: Promise<Dexie>, table: string, data: any): Promise<void> {
    return  db.then(x => {
              return x.table(table).toArray();
            }).then(x => {

                const idArray = x.map(obj => parseInt(obj.id, 0));

                data.id = (Math.max(...idArray) + 1).toString();

                db.then( y => {
                    y.table(table).add(data).catch(Dexie.BulkError, (e) => {
                        console.error(`${table} add not succeed.`);
                    });
                });

            });
}

function TableUpdate(db: Promise<Dexie>, table: string, id: string, data: any): Promise<void> {
    return  db.then( x => {
                x.table(table).update(id, data).catch(Dexie.BulkError, (e) => {
                    console.error(`${table} add not succeed.`);
                });
            });
}

function TableDelete(db: Promise<Dexie>, table: string, id: string): Promise<void> {
    return  db.then( x => {
                x.table(table).delete(id).catch(Dexie.BulkError, (e) => {
                    console.error(`${table} add not succeed.`);
                });
            });
}

export { OpenDB, GetAll, TableInit, TableAdd, TableUpdate, TableDelete };
