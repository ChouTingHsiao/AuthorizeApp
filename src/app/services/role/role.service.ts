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
}
