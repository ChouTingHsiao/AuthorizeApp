import { Injectable } from '@angular/core';
import { Menu } from '@shared/Model/menu.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableInit, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { Observable } from 'rxjs';
import Dexie from 'dexie';
import { RoleService } from '@services/role/role.service';
import { GroupService } from '@services/group/group.service';
import { ProgramService } from '@services/program/program.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  Menus: Menu[] = [
    { id: '1', name: 'User', program: '1'},
    { id: '2', name: 'Role', program: '2'},
    { id: '3', name: 'Group', program: '3'},
    { id: '4', name: 'Program', program: '4'},
    { id: '5', name: 'Menu', program: '5'},
  ];

  private db: Promise<Dexie>;

  constructor(private roleService: RoleService,
              private groupService: GroupService,
              private programService: ProgramService) {
      this.db = OpenDB();
  }

  getAll(): Observable<Menu[]> {
    return new Observable(subscriber => {

      TableInit(this.db, TableEnum.Menus, this.Menus).then(() => {
        GetAll(this.db, TableEnum.Menus, subscriber);
      });

    });
  }

  getByAuth(): Observable<Menu[]> {

    return new Observable(subscriber => {

      this.getAll().pipe(
      switchMap(Menus => this.programService.getAll().pipe(
        switchMap(Programs => this.groupService.getAll().pipe(
          switchMap(Groups => this.roleService.getAll().pipe(
            map(Roles => ({ Menus, Programs, Groups, Roles }))
          ))
        ))
      ))
    ).subscribe(({ Menus, Programs, Groups, Roles }) => {

      let AuthMenu: Menu[];

      const Auth: string =  localStorage.getItem('Auth');

      const roleId: string = Roles.filter(x => x.name === Auth)[0].id;

      const AuthGroupMap = Groups.filter( x => x.role.includes(roleId)).map(x => x.id);

      const AuthProgram = Programs.filter( x => x.auth === '' || AuthGroupMap.includes(x.auth));

      const AuthProgramMap = AuthProgram.map(x => x.id);

      AuthMenu = Menus.filter( x => x.program === '' || AuthProgramMap.includes(x.program));

      AuthProgram.forEach(x => {
        AuthMenu.find(y => y.program === x.id).linkTag = x.linkTag;
      });

      subscriber.next(AuthMenu);
      subscriber.complete();

    });

    });

  }

  create(menu: Menu): Observable<Menu[]> {
    return new Observable(subscriber => {

      if (!menu.program) {
        menu.program = '';
      }

      TableAdd(this.db, TableEnum.Menus, menu).then(() => {
        GetAll(this.db, TableEnum.Menus, subscriber);
      });

    });
  }

  update(menu: Menu): Observable<Menu[]> {
    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Menus, menu.id, menu).then(() => {
        GetAll(this.db, TableEnum.Menus, subscriber);
      });

    });
  }

  delete(menu: Menu): Observable<Menu[]> {
    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Users, menu.id).then(() => {
        GetAll(this.db, TableEnum.Menus, subscriber);
      });

    });
  }

}
