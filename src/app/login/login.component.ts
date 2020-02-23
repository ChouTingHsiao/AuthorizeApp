import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { RoleService } from '@services/role/role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Account: string;
  Password: string;

  constructor(private router: Router,
              private userService: UserService,
              private roleService: RoleService) { }

  ngOnInit() {
    this.Account = 'USER';
    this.Password = 'USER';
  }

  Login() {
    const user = this.userService.getAll().filter(x => x.name === this.Account && x.password === this.Password);

    if ( user.length > 0 ) {
        const role = this.roleService.getAll().filter(x => x.id === user[0].role);
        localStorage.setItem('Auth', role[0].name);
        alert('登入成功');
        this.router.navigate(['/Main']);
        return;
    }
    localStorage.setItem('Auth', '');
    alert('登入失敗');
  }

}

