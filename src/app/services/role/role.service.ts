import { Injectable } from '@angular/core';
import { Role } from '@shared/Model/role.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  Roles: Role[] = [
    { id: '1', name: 'ADMIN', remark: '管理員' },
    { id: '2', name: 'USER', remark: '一般使用者' }
  ];

  constructor() { }

  getAll(): Observable<Role[]> {
    return new Observable(subscriber => {

      if (!localStorage.getItem(TableEnum.Roles)) {
        localStorage.setItem(TableEnum.Roles, JSON.stringify(this.Roles));
      }

      subscriber.next(JSON.parse(localStorage.getItem(TableEnum.Roles)));
      subscriber.complete();

    });
  }

  create(role: Role): Observable<Role[]> {
    return new Observable(subscriber => {

      const dataList: Role[] = JSON.parse(localStorage.getItem(TableEnum.Roles));

      role.id = (dataList.length + 1).toString();

      dataList.push(role);

      localStorage.setItem(TableEnum.Roles, JSON.stringify(dataList));

      subscriber.next(dataList);
      subscriber.complete();

    });
  }

  update(role: Role): Observable<Role[]> {
    return new Observable(subscriber => {

      let dataList: Role[] = JSON.parse(localStorage.getItem(TableEnum.Roles));

      dataList = dataList.filter(x => x.id !== role.id);

      dataList.push(role);

      localStorage.setItem(TableEnum.Roles, JSON.stringify(dataList));

      subscriber.next(dataList);
      subscriber.complete();

    });
  }

  delete(role: Role): Observable<Role[]> {
    return new Observable(subscriber => {

      let dataList: Role[] = JSON.parse(localStorage.getItem(TableEnum.Roles));

      dataList = dataList.filter(x => x.id !== role.id);

      localStorage.setItem(TableEnum.Roles, JSON.stringify(dataList));

      subscriber.next(dataList);
      subscriber.complete();

    });
  }
}
