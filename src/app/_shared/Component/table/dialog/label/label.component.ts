import { Component, OnInit } from '@angular/core';
import { Column } from '@shared/Model/table.model';
import { IDialogInputComponent } from '@shared/Component/table/dialog/IDialogInputComponent';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements  IDialogInputComponent, OnInit {

  column: Column;

  visible: string;

  constructor() {}

  ngOnInit() {
    this.visible = this.column.visible || this.column.visible === true ? '' : 'none';
  }
}
