import { Component, OnInit } from '@angular/core';
import { Column } from '@shared/Model/table.model';

@Component({
  selector: 'app-input',
  template:
  `<mat-form-field>
  <input matInput placeholder={{column.columnDef}} [(ngModel)]="column.value">
  </mat-form-field>
  <br/>`
})
export class InputComponent implements OnInit {

  column: Column;

  constructor() {}

  ngOnInit() {}
}
