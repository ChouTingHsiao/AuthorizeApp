import { Injectable } from '@angular/core';
import { Program } from '@shared/Model/program.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  Programs: Program[] = [
    { id: '1', name: 'User', remark: '使用者', link: 'User', auth: '1' },
    { id: '2', name: 'Role', remark: '角色', link: 'Role', auth: '1' },
    { id: '3', name: 'Group', remark: '群組', link: 'Group', auth: '' },
    { id: '4', name: 'Program', remark: '程式', link: 'Program', auth: '' },
    { id: '5', name: 'Menu', remark: '選單', link: 'Menu', auth: '' },
  ];

  constructor() { }

  getAll(): Observable<Program[]> {
    return new Observable(subscriber => {

      if (!localStorage.getItem(TableEnum.Programs)) {
        localStorage.setItem(TableEnum.Programs, JSON.stringify(this.Programs));
      }

      subscriber.next(JSON.parse(localStorage.getItem(TableEnum.Programs)));
      subscriber.complete();

    });
  }

  create(program: Program): Observable<Program[]> {
    return new Observable(subscriber => {

      const dataList: Program[] = JSON.parse(localStorage.getItem(TableEnum.Programs));

      program.id = (dataList.length + 1).toString();

      if (!program.auth) {
        program.auth = '';
      }

      dataList.push(program);

      localStorage.setItem(TableEnum.Programs, JSON.stringify(dataList));

      subscriber.next(dataList);
      subscriber.complete();

    });
  }

  update(program: Program): Observable<Program[]> {
    return new Observable(subscriber => {

      let dataList: Program[] = JSON.parse(localStorage.getItem(TableEnum.Programs));

      dataList = dataList.filter(x => x.id !== program.id);

      dataList.push(program);

      localStorage.setItem(TableEnum.Programs, JSON.stringify(dataList));

      subscriber.next(dataList);
      subscriber.complete();

    });
  }

  delete(program: Program): Observable<Program[]> {
    return new Observable(subscriber => {

      let dataList: Program[] = JSON.parse(localStorage.getItem(TableEnum.Programs));

      dataList = dataList.filter(x => x.id !== program.id);

      localStorage.setItem(TableEnum.Programs, JSON.stringify(dataList));

      subscriber.next(dataList);
      subscriber.complete();

    });
  }

}
