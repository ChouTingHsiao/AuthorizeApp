import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule  } from '@src/material-module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { maintainReducer } from '@shared/Reducer/maintain.reducer';

import { MainRoutingModule } from './main-routing.module';
import { DialogComponent } from '@shared/Component/dialog.component';
import { InputComponent } from '@shared/Component/input.component';
import { LabelComponent } from '@shared/Component/label.component';
import { SelectComponent } from '@shared/Component/select.component';
import { MultiSelectComponent } from '@shared/Component/multiselect.component';
import { TableComponent } from '@shared/Component/table.component';
import { MainComponent } from './main.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { GroupComponent } from './group/group.component';
import { ProgramComponent } from './program/program.component';
import { DynamicHostDirective } from '@shared/Directive/dynamichost.Directive';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';

@NgModule({
  declarations: [
    MainComponent,
    UserComponent,
    RoleComponent,
    GroupComponent,
    ProgramComponent,
    DialogComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    MultiSelectComponent,
    TableComponent,
    DynamicHostDirective,
    UnauthorizeComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ maintainReducer }),
  ],
  entryComponents: [
    DialogComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    MultiSelectComponent,
    TableComponent
  ]
})
export class MainModule { }
