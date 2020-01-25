import { Component, OnInit } from '@angular/core';
import { Schema } from '../Model/table.model';

@Component({
  selector: 'app-input',
  template:
  `<label class="">
      {{schema.value}}
   </label>
   <br/>`
})
export class LabelComponent implements OnInit {

  schema: Schema;

  constructor() {}

  ngOnInit() {}
}
