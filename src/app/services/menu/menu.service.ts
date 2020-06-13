import { Injectable } from '@angular/core';
import { Menu } from '@shared/Model/menu.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { Observable } from 'rxjs';
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

  constructor(private roleService: RoleService,
              private groupService: GroupService,
              private programService: ProgramService) { }

  getAll(): Observable<Menu[]> {
    return new Observable(subscriber => {

      if (!localStorage.getItem(TableEnum.Menus)) {
        localStorage.setItem(TableEnum.Menus, JSON.stringify(this.Menus));
      }

      subscriber.next(JSON.parse(localStorage.getItem(TableEnum.Menus)));
      subscriber.complete();

    });
  }

  getByAuth(): Observable<Menu[]> {

    let AuthProgram;

    this.getAll().pipe(
      switchMap(Menus => this.programService.getAll().pipe(
        switchMap(Programs => this.groupService.getAll().pipe(
          switchMap(Groups => this.roleService.getAll().pipe(
            map(Roles => ({ Menus, Programs, Groups, Roles }))
          ))
        ))
      ))
    ).subscribe(({ Menus, Programs, Groups, Roles }) => {

      const Auth: string =  localStorage.getItem('Auth');

      const roleId: string = Roles.filter(x => x.name === Auth)[0].id;

      const AuthGroup = Groups.filter( x => x.role.includes(roleId));

      const AuthGroupMap = AuthGroup.map(x => x.id);

      AuthProgram = Programs.filter( x => x.auth === '' || AuthGroupMap.includes(x.auth));

    });

    return new Observable(subscriber => {

      subscriber.next(AuthProgram);
      subscriber.complete();

    });

  }

  create(menu: Menu): Observable<Menu[]> {
    return new Observable(subscriber => {

      const dataList: Menu[] = JSON.parse(localStorage.getItem(TableEnum.Menus));

      menu.id = (dataList.length + 1).toString();

      if (!menu.program) {
        menu.program = '';
      }

      dataList.push(menu);

      localStorage.setItem(TableEnum.Menus, JSON.stringify(dataList));

      subscriber.next(dataList);
      subscriber.complete();

    });
  }

  update(menu: Menu): Observable<Menu[]> {
    return new Observable(subscriber => {

      let dataList: Menu[] = JSON.parse(localStorage.getItem(TableEnum.Menus));

      dataList = dataList.filter(x => x.id !== menu.id);

      dataList.push(menu);

      localStorage.setItem(TableEnum.Menus, JSON.stringify(dataList));

      subscriber.next(dataList);
      subscriber.complete();

    });
  }

  delete(menu: Menu): Observable<Menu[]> {
    return new Observable(subscriber => {

      let dataList: Menu[] = JSON.parse(localStorage.getItem(TableEnum.Menus));

      dataList = dataList.filter(x => x.id !== menu.id);

      localStorage.setItem(TableEnum.Menus, JSON.stringify(dataList));

      subscriber.next(dataList);
      subscriber.complete();

    });
  }

}
