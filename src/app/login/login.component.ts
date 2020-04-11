import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { RoleService } from '@services/role/role.service';
import { map, switchMap } from 'rxjs/operators';

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

    this.userService.getAll().pipe(
      switchMap(users => this.roleService.getAll().pipe(
        map(roles => ({ users, roles }))
      ))
    ).subscribe(({ users, roles }) => {

      const user = users.filter(x => x.name === this.Account && x.password === this.Password);

      if ( user.length > 0 ) {
          const role = roles.filter( x => x.id === user[0].role);
          localStorage.setItem('Auth', role[0].name);
          alert('登入成功');
          this.router.navigate(['/Main']);
          return;
      }

      localStorage.setItem('Auth', '');

      alert('登入失敗');

    });

  }

}

