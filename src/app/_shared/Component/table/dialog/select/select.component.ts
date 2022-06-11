import { Component, OnInit } from '@angular/core';
import { Column } from '@shared/Model/table.model';
import { entityToArray } from '@shared/Method/object.method';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  default = '';

  column: Column;

  onChanges: (event) => void;

  source: Observable<unknown>;

  entityToArray = (x: unknown ): unknown[] => entityToArray(x);

  constructor() {}

  ngOnInit() {
    this.source = this.column.source();
  }
}
