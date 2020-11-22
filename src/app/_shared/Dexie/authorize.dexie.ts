import { Subscriber } from 'rxjs';
import Dexie from 'dexie';

function OpenDB(): Promise<Dexie> {
    const AuthorizeDb = new Dexie('Authorize');

    AuthorizeDb.version(1).stores({
      Users: 'id, name, password, role',
      Roles: 'id, name, remark',
      Groups: 'id, name, role',
      Programs: 'id, name, remark, linkTag, auth',
      Menus: 'id, name, program'
    });

    return AuthorizeDb.open();
}

function TableInit(db: Promise<Dexie>, table: string, data: any[]): Promise<void> {
    return  db.then(x => {
                return x.table(table).count();
            }).then(x => {
                if (x < 1) {
                    db.then( y => {
                        y.table(table).bulkAdd(data).catch(Dexie.BulkError, (e) => {
                            console.error('bulkAdd did not succeed.');
                        });
                    });
                }
            });
}

function GetAll(db: Promise<Dexie>, table: string, subscriber: Subscriber<any>) {
    db.then( x => {
        x.table(table).toArray().then((y) => {
          subscriber.next(y);
          subscriber.complete();
        });
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
                        console.error('add not succeed.');
                    });
                });

            });
}

function TableUpdate(db: Promise<Dexie>, table: string, id: string, data: any): Promise<void> {
    return  db.then( x => {
                x.table(table).update(id, data).catch(Dexie.BulkError, (e) => {
                    console.error('add not succeed.');
                });
            });
}

function TableDelete(db: Promise<Dexie>, table: string, id: string): Promise<void> {
    return  db.then( x => {
                x.table(table).delete(id).catch(Dexie.BulkError, (e) => {
                    console.error('add not succeed.');
                });
            });
}

export { OpenDB, GetAll, TableInit, TableAdd, TableUpdate, TableDelete };
