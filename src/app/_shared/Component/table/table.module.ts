import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { MaterialModule  } from '@shared/Material/material.module';

import { DynamicHostDirective } from '@shared/Directive/dynamichost.Directive';
import { DialogComponent } from '@src/app/_shared/Component/table/dialog/dialog.component';
import { InputComponent } from '@src/app/_shared/Component/table/dialog/input/input.component';
import { LabelComponent } from '@src/app/_shared/Component/table/dialog/label/label.component';
import { SelectComponent } from '@src/app/_shared/Component/table/dialog/select/select.component';
import { MultiSelectComponent } from '@src/app/_shared/Component/table/dialog/multiselect/multiselect.component';
import { TableComponent } from '@shared/Component/table/table.component';

@NgModule({
  declarations: [
    DynamicHostDirective,
    DialogComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    MultiSelectComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  exports: [
    TableComponent,
  ],
})
export class TableModule { }
