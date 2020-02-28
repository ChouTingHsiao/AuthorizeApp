import { Injectable } from '@angular/core';
import { Program } from '@shared/Model/program.model';
import { TableEnum } from '@shared/Enum/table.enum';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  Programs: Program[] = [
    { id: '1', name: 'User', remark: '使用者', auth: '1' },
    { id: '2', name: 'Role', remark: '角色', auth: '1' },
    { id: '3', name: 'Group', remark: '群組', auth: '' },
    { id: '4', name: 'Program', remark: '程式', auth: '' },
  ];

  constructor() { }

  getAll(): Program[] {

    if (localStorage.getItem(TableEnum.Programs)) {
      return JSON.parse(localStorage.getItem(TableEnum.Programs));
    }

    localStorage.setItem(TableEnum.Programs, JSON.stringify(this.Programs));

    return JSON.parse(localStorage.getItem(TableEnum.Programs));
  }

}
