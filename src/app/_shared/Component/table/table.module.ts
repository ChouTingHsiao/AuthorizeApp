import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { MaterialModule  } from '@shared/Material/material.module';

import { DynamicHostDirective } from '@shared/Directive/dynamichost.Directive';
import { DialogComponent } from '@src/app/_shared/Component/table/dialog/dialog.component';
import { InputComponent } from '@src/app/_shared/Component/table/dialog/input/input.component';
import { LabelComponent } from '@src/app/_shared/Component/table/dialog/label/label.component';
import { SelectComponent } from '@src/app/_shared/Component/table/dialog/select/select.component';
import { MultiSelectComponent } from '@src/app/_shared/Component/table/dialog/multiselect/multiselect.component';
import { TableComponent } from '@shared/Component/table/table.component';
import { DetailComponent } from '@shared/Component/table/detail.component';

@NgModule({
  declarations: [
    DynamicHostDirective,
    DialogComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    MultiSelectComponent,
    TableComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    TableComponent,
  ],
})
export class TableModule { }
