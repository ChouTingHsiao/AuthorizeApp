import Dexie from 'dexie';
import { TableEnum } from '@shared/Enum/table.enum';
import { Users, Roles, Programs, Menus, Groups, Buttons } from '@shared/Dexie/data';

function OpenDB(): Promise<Dexie> {
    const AuthorizeDb = new Dexie('Authorize');

    AuthorizeDb.version(1).stores({
      Users: 'id, name, password, role',
      Roles: 'id, name, remark',
      Groups: 'id, name, roles',
      Programs: 'id, name, remark, linkTag, auth',
      Menus: 'id, name, program',
      Buttons: 'id, name, remark, program',
    });

    TableInit(AuthorizeDb, TableEnum.Users, Users);

    TableInit(AuthorizeDb, TableEnum.Roles, Roles);

    TableInit(AuthorizeDb, TableEnum.Groups, Groups);

    TableInit(AuthorizeDb, TableEnum.Programs, Programs);

    TableInit(AuthorizeDb, TableEnum.Menus, Menus);

    TableInit(AuthorizeDb, TableEnum.Buttons, Buttons);

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
        });

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
