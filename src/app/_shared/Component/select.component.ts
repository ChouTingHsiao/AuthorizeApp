import { Component, OnInit } from '@angular/core';
import { Column } from '@shared/Model/table.model';
import { entityToArray } from '@shared/Method/object.method';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select',
  template:
  `<mat-form-field>
   <mat-label>{{column.columnDef}}</mat-label>
   <mat-select [(ngModel)]="column.value" name="{{column.columnDef}}">
    <mat-option [value]="default">--</mat-option>
    <mat-option *ngFor="let data of entityToArray(source | async)" [value]="data.id">
      {{data.name}}
    </mat-option>
   </mat-select>
   </mat-form-field>
   <br/>`
})
export class SelectComponent implements OnInit {

  default = '';

  column: Column;

  source: Observable<any>;

  entityToArray = (x: any ): any[] => entityToArray(x);

  constructor() {}

  ngOnInit() {
    this.source = this.column.source();
  }
}
