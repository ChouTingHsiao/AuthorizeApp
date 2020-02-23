import { Injectable } from '@angular/core';
import { User } from '@shared/Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  TableName = 'Users';

  Users: User[] = [
    { id: '1', name: 'ADMIN', password: 'ADMIN', role: '1' },
    { id: '2', name: 'USER', password: 'USER', role: '2' }
  ];

  constructor() { }

  getAll(): User[] {

    if (localStorage.getItem(this.TableName)) {
      return JSON.parse(localStorage.getItem(this.TableName));
    }

    localStorage.setItem(this.TableName, JSON.stringify(this.Users));

    return JSON.parse(localStorage.getItem(this.TableName));
  }
}
