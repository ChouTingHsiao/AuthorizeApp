import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { MaterialModule  } from '@src/material-module';

import { UnauthorizeComponent } from '@shared/Component/unauthorize/unauthorize.component';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { GroupComponent } from './group/group.component';
import { ProgramComponent } from './program/program.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from '@shared/Component/dashboard/dashboard.component';

import { DynamicHostDirective } from '@shared/Directive/dynamichost.Directive';
import { DialogComponent } from '@shared/Component/dialog/dialog.component';
import { InputComponent } from '@shared/Component/input/input.component';
import { LabelComponent } from '@shared/Component/label/label.component';
import { SelectComponent } from '@shared/Component/select/select.component';
import { MultiSelectComponent } from '@shared/Component/multiselect/multiselect.component';
import { TableComponent } from '@shared/Component/table/table.component';

@NgModule({
  declarations: [
    UnauthorizeComponent,
    MainComponent,
    UserComponent,
    RoleComponent,
    GroupComponent,
    ProgramComponent,
    MenuComponent,
    DashboardComponent,
    DynamicHostDirective,
    DialogComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    MultiSelectComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MainRoutingModule,
    MaterialModule
  ],
  entryComponents: [
    DialogComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    MultiSelectComponent,
    TableComponent
  ],
})
export class MainModule { }
