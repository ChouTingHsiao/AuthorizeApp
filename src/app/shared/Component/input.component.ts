import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  template:
  `<mat-form-field>
  <input matInput placeholder={{placeholdertext}} [(ngModel)]="valuetext">
  </mat-form-field>
  <br/>`
})
export class InputComponent implements OnInit {

  placeholdertext: string;

  valuetext: string;

  constructor() {}

  ngOnInit() {}
}
