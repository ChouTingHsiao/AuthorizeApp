import { Component, OnInit } from '@angular/core';
import { Schema } from '@shared/Model/table.model';

@Component({
  selector: 'app-input',
  template:
  `<mat-form-field>
  <input matInput placeholder={{schema.column}} [(ngModel)]="schema.value">
  </mat-form-field>
  <br/>`
})
export class InputComponent implements OnInit {

  schema: Schema;

  constructor() {}

  ngOnInit() {}
}
