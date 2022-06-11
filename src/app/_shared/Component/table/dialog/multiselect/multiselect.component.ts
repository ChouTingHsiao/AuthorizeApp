import { Component, OnInit } from '@angular/core';
import { Column } from '@shared/Model/table.model';
import { entityToArray } from '@shared/Method/object.method';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiSelectComponent implements OnInit {

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
