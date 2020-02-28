import { Injectable } from '@angular/core';
import { User } from '@shared/Model/user.model';
import { TableEnum } from '@shared/Enum/table.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Users: User[] = [
    { id: '1', name: 'ADMIN', password: 'ADMIN', role: '1' },
    { id: '2', name: 'USER', password: 'USER', role: '2' }
  ];

  constructor() { }

  getAll(): User[] {

    if (localStorage.getItem(TableEnum.Users)) {
      return JSON.parse(localStorage.getItem(TableEnum.Users));
    }

    localStorage.setItem(TableEnum.Users, JSON.stringify(this.Users));

    return JSON.parse(localStorage.getItem(TableEnum.Users));
  }
}
