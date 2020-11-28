import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorize',
  templateUrl: './unauthorize.component.html',
  styleUrls: ['./unauthorize.component.scss']
})
export class UnauthorizeComponent implements OnInit {

  first: string;
  third: string;

  constructor() { }

  ngOnInit() {
    this.first = '4';
    this.third = '1';
  }

}
