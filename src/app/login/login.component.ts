import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@shared/Model/user.model';
import { Role } from '@shared/Model/role.model';
import { Group } from '@shared/Model/group.model';
import { Program } from '@shared/Model/program.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Account: string;
  Password: string;

  Users: User[] = JSON.parse(localStorage.getItem('Users'));
  Roles: Role[] = JSON.parse(localStorage.getItem('Roles'));

  constructor(private router: Router) { }

  ngOnInit() {
    this.Account = 'USER';
    this.Password = 'USER';
  }

  Login() {
    const user = Users.filter(x => x.name === this.Account && x.password === this.Password);

    if ( user.length > 0 ) {
        const role = Roles.filter(x => x.id === user[0].role);
        localStorage.setItem('Auth', role[0].name);
        localStorage.setItem('Users', JSON.stringify(Users));
        localStorage.setItem('Roles', JSON.stringify(Roles));
        localStorage.setItem('Groups', JSON.stringify(Groups));
        localStorage.setItem('Programs', JSON.stringify(Programs));
        alert('登入成功');
        this.router.navigate(['/Main']);
        return;
    }
    localStorage.setItem('Auth', '');
    alert('登入失敗');
  }

}

const Users: User[] = [
  { id: '1', name: 'ADMIN', password: 'ADMIN', role: '1' },
  { id: '2', name: 'USER', password: 'USER', role: '2' }
];

const Roles: Role[] = [
  { id: '1', name: 'ADMIN', remark: '管理員' },
  { id: '2', name: 'USER', remark: '一般使用者' }
];

const Groups: Group[] = [
  { id: '1', name: '管理員群組', role: ['1']}
];

const Programs: Program[] = [
  { id: '1', name: 'User', remark: '使用者', auth: '1' },
  { id: '2', name: 'Role', remark: '角色', auth: '1' },
  { id: '3', name: 'Group', remark: '群組', auth: '' },
  { id: '4', name: 'Program', remark: '程式', auth: '' },
];
