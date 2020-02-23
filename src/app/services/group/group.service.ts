import { Injectable } from '@angular/core';
import { Group } from '@shared/Model/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  TableName = 'Groups';

  Groups: Group[] = [
    { id: '1', name: '管理員群組', role: ['1']}
  ];

  constructor() { }

  getAll(): Group[] {

    if (localStorage.getItem(this.TableName)) {
      return JSON.parse(localStorage.getItem(this.TableName));
    }

    localStorage.setItem(this.TableName, JSON.stringify(this.Groups));

    return JSON.parse(localStorage.getItem(this.TableName));
  }

}
