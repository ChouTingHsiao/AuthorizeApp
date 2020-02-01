import { Component, OnInit } from '@angular/core';
import { Schema } from '@shared/Model/table.model';

@Component({
  selector: 'app-select',
  template:
  `<h4>{{schema.column}}</h4>
   <mat-select [(ngModel)]="schema.value" name="{{schema.column}}">
    <mat-option [value]="default">--</mat-option>
    <mat-option *ngFor="let data of schema.source" [value]="data.id">
      {{data.name}}
    </mat-option>
   </mat-select>
   <br/>`
})
export class SelectComponent implements OnInit {

  schema: Schema;

  default = '';

  constructor() {}

  ngOnInit() {}
}
