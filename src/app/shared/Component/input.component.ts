import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  template:
  `<mat-form-field>
  <input matInput placeholder={{placeholdertext}}>
  </mat-form-field>`
})
export class InputComponent implements OnInit {

  placeholdertext: string;

  constructor() {}

  ngOnInit() {
    this.placeholdertext = 'test';
  }
}
