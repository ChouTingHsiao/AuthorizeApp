import { Component, OnInit } from '@angular/core';
import { Schema } from '@shared/Model/table.model';

@Component({
  selector: 'app-label',
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
