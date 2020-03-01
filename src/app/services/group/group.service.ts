import { Injectable } from '@angular/core';
import { Group } from '@shared/Model/group.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  Groups: Group[] = [
    { id: '1', name: '管理員群組', role: ['1']}
  ];

  constructor() { }

  getAll(): Observable<Group[]> {
    return new Observable(subscriber => {

      if (!localStorage.getItem(TableEnum.Groups)) {
        localStorage.setItem(TableEnum.Groups, JSON.stringify(this.Groups));
      }

      subscriber.next(JSON.parse(localStorage.getItem(TableEnum.Groups)));
      subscriber.complete();

    });
  }

  create(group: Group): Observable<Group[]> {
    return new Observable(subscriber => {

      const dataList: Group[] = JSON.parse(localStorage.getItem(TableEnum.Groups));

      group.id = (dataList.length + 1).toString();

      dataList.push(group);

      localStorage.setItem(TableEnum.Groups, JSON.stringify(dataList));

      subscriber.next(dataList);
      subscriber.complete();

    });
  }

  update(group: Group): Observable<Group[]> {
    return new Observable(subscriber => {

      let dataList: Group[] = JSON.parse(localStorage.getItem(TableEnum.Groups));

      dataList = dataList.filter(x => x.id !== group.id);

      dataList.push(group);

      localStorage.setItem(TableEnum.Groups, JSON.stringify(dataList));

      subscriber.next(dataList);
      subscriber.complete();

    });
  }

}
