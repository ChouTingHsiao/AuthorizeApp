import { Injectable } from '@angular/core';
import { User } from '@shared/Model/user.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Users: User[] = [
    { id: '1', name: 'ADMIN', password: 'ADMIN', role: '1' },
    { id: '2', name: 'USER', password: 'USER', role: '2' }
  ];

  constructor() { }

  getAll(): Observable<User[]> {
    return new Observable(subscriber => {

      if (!localStorage.getItem(TableEnum.Users)) {
        localStorage.setItem(TableEnum.Users, JSON.stringify(this.Users));
      }

      subscriber.next(JSON.parse(localStorage.getItem(TableEnum.Users)));
      subscriber.complete();

    });
  }

  create(user: User): Observable<User[]> {
    return new Observable(subscriber => {

      const dataList: User[] = JSON.parse(localStorage.getItem(TableEnum.Users));

      user.id = (dataList.length + 1).toString();

      dataList.push(user);

      localStorage.setItem(TableEnum.Users, JSON.stringify(dataList));

      subscriber.next(dataList);
      subscriber.complete();

    });
  }

  update(user: User): Observable<User[]> {
    return new Observable(subscriber => {

      let dataList: User[] = JSON.parse(localStorage.getItem(TableEnum.Users));

      dataList = dataList.filter(x => x.id !== user.id);

      dataList.push(user);

      localStorage.setItem(TableEnum.Users, JSON.stringify(dataList));

      subscriber.next(dataList);
      subscriber.complete();

    });
  }

  delete(user: User): Observable<User[]> {
    return new Observable(subscriber => {

      let dataList: User[] = JSON.parse(localStorage.getItem(TableEnum.Users));

      dataList = dataList.filter(x => x.id !== user.id);

      localStorage.setItem(TableEnum.Users, JSON.stringify(dataList));

      subscriber.next(dataList);
      subscriber.complete();

    });
  }
}
