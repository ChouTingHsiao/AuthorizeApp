import { Injectable } from '@angular/core';
import { Group } from '@shared/Model/group.model';
import { TableEnum } from '@shared/Enum/table.enum';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  Groups: Group[] = [
    { id: '1', name: '管理員群組', role: ['1']}
  ];

  constructor() { }

  getAll(): Group[] {

    if (localStorage.getItem(TableEnum.Groups)) {
      return JSON.parse(localStorage.getItem(TableEnum.Groups));
    }

    localStorage.setItem(TableEnum.Groups, JSON.stringify(this.Groups));

    return JSON.parse(localStorage.getItem(TableEnum.Groups));
  }

}
