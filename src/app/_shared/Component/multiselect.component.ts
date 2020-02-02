import { Component, OnInit } from '@angular/core';
import { Column } from '@shared/Model/table.model';

@Component({
  selector: 'app-multiselect',
  template:
  `<mat-form-field>
   <mat-label>{{column.columnDef}}</mat-label>
   <mat-select multiple [(ngModel)]="column.value" name="{{column.columnDef}}">
    <mat-option [value]="default">--</mat-option>
    <mat-option *ngFor="let data of column.source" [value]="data.id">
      {{data.name}}
    </mat-option>
   </mat-select>
   </mat-form-field>
   <br/>`
})
export class MultiSelectComponent implements OnInit {

  column: Column;

  default = '';

  constructor() {}

  ngOnInit() {}
}
