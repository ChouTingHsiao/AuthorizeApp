import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title = 'Authorize';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Logout() {
    localStorage.setItem('Auth', '');
    this.router.navigate(['/Login']);
  }

}
