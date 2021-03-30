import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { RoleService } from '@services/role/role.service';
import { GroupService } from '@services/group/group.service';
import { Group } from '@shared/Model/group.model';
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
              private roleService: RoleService,
              private groupService: GroupService) { }

  ngOnInit() {
    this.Account = 'USER';
    this.Password = 'USER';
  }

  Login() {

    this.userService.getAll().pipe(
      switchMap(users => this.roleService.getAll().pipe(
        switchMap(roles => this.groupService.getAll().pipe(
          map(groups => ({ users, roles, groups }))
        ))
      ))
    ).subscribe(({ users, roles, groups }) => {

      const user = users.filter(x => x.name === this.Account && x.password === this.Password);

      if ( user.length > 0 ) {

        const role = roles.filter( x => x.id === user[0].role);
        
        localStorage.setItem('UserRole', role[0].name);

        localStorage.setItem('UserGroup', '');

        const group = groups.filter(x => x.roles.includes(role[0].id));

        console.log(group);

        if(group[0]) {

          localStorage.setItem('UserGroup', group[0].name);

        }

        alert('登入成功');

        this.router.navigate(['/Main']);

        return;

      }

      localStorage.setItem('UserRole', '');

      alert('登入失敗');

    });

  }

}

