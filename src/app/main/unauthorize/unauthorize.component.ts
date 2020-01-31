import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorize',
  templateUrl: './unauthorize.component.html',
  styleUrls: ['./unauthorize.component.scss']
})
export class UnauthorizeComponent implements OnInit {

  first: string;
  second: string;
  third: string;

  constructor() { }

  ngOnInit() {
    const errCode = window.location.pathname.replace('/', '').split('');
    this.first = errCode[0];
    this.third = errCode[2];
    console.log(window.location.pathname);
  }

}
