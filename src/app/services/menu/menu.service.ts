import { Injectable } from '@angular/core';
import { Menu } from '@shared/Model/menu.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  Menus: Menu[] = [
    { id: '1', name: 'User', link: 'User'},
    { id: '2', name: 'Role', link: 'Role'},
    { id: '3', name: 'Group', link: 'Group'},
    { id: '4', name: 'Program', link: 'Program'},
    { id: '5', name: 'Menu', link: 'Menu'},
  ];

  constructor() { }

  getAll(): Observable<Menu[]> {
    return new Observable(subscriber => {

      if (!localStorage.getItem(TableEnum.Menus)) {
        localStorage.setItem(TableEnum.Menus, JSON.stringify(this.Menus));
      }

      subscriber.next(JSON.parse(localStorage.getItem(TableEnum.Menus)));
      subscriber.complete();

    });
  }


  create(menu: Menu): Observable<Menu[]> {
    return new Observable(subscriber => {

      const dataList: Menu[] = JSON.parse(localStorage.getItem(TableEnum.Menus));

      menu.id = (dataList.length + 1).toString();

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
