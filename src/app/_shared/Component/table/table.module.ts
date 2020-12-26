import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { MaterialModule  } from '@shared/Material/material.module';

import { DynamicHostDirective } from '@shared/Directive/dynamichost.Directive';
import { DialogComponent } from '@shared/Component/dialog/dialog.component';
import { InputComponent } from '@shared/Component/dialog/input/input.component';
import { LabelComponent } from '@shared/Component/dialog/label/label.component';
import { SelectComponent } from '@shared/Component/dialog/select/select.component';
import { MultiSelectComponent } from '@shared/Component/dialog/multiselect/multiselect.component';
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
