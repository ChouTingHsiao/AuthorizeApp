import { Component, OnInit } from '@angular/core';
import { Schema } from '@shared/Model/table.model';

@Component({
  selector: 'app-multiselect',
  template:
  `<mat-label>{{schema.column}}</mat-label>
   <mat-select multiple [(ngModel)]="schema.value" name="{{schema.column}}">
    <mat-option [value]="default">--</mat-option>
    <mat-option *ngFor="let data of schema.source" [value]="data.id">
      {{data.name}}
    </mat-option>
   </mat-select>
   <br/>`
})
export class MultiSelectComponent implements OnInit {

  schema: Schema;

  default = '';

  constructor() {}

  ngOnInit() {}
}
