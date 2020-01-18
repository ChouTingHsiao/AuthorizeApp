import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Account: string;
  Password: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Login() {
    if (this.Account === 'ADMIN' && this.Password === 'ADMIN' ) {
        alert('登入成功');
        localStorage.setItem('Auth', 'Admin');
        this.router.navigate(['/Main']);
        return;
    }
    localStorage.setItem('Auth', '');
    alert('登入失敗' + this.Account + this.Password);
  }

}
