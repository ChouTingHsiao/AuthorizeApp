import { Component, OnInit } from '@angular/core';
import { Column } from '@shared/Model/table.model';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  column: Column;

  visible: string;

  constructor() {}

  ngOnInit() {
    this.visible = this.column.visible || this.column.visible === true ? '' : 'none';
  }
}
