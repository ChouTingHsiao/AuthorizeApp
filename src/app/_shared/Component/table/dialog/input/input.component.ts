import { Component, OnInit } from '@angular/core';
import { Column } from '@shared/Model/table.model';
import { IDialogInputComponent } from '@shared/Component/table/dialog/IDialogInputComponent';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements IDialogInputComponent {

  column: Column;

  constructor() {}

}
