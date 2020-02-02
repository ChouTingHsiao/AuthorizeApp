import { Component, OnInit } from '@angular/core';
import { Column } from '@shared/Model/table.model';

@Component({
  selector: 'app-label',
  template:
  `<label [style.display]="visible">
   {{column.value}}
   </label>
   <br/>`
})
export class LabelComponent implements OnInit {

  column: Column;

  visible: string;

  constructor() {}

  ngOnInit() {
    this.visible = this.column.visible || this.column.visible === true ? '' : 'none';
  }
}
