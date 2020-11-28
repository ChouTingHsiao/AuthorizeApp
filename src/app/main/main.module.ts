import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule  } from '@src/material-module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_REDUCER } from '@shared/ngrx/Reducer/root.reducer';

import { UserEffects } from '@shared/ngrx/Effects/user.effects';
import { RoleEffects } from '@shared/ngrx/Effects/role.effects';
import { GroupEffects } from '@shared/ngrx/Effects/group.effects';
import { ProgramEffects } from '@shared/ngrx/Effects/program.effects';
import { MenuEffects } from '@shared/ngrx/Effects/menu.effects';

import { MainRoutingModule } from './main-routing.module';
import { DialogComponent } from '@shared/Component/dialog/dialog.component';
import { InputComponent } from '@shared/Component/input/input.component';
import { LabelComponent } from '@shared/Component/label/label.component';
import { SelectComponent } from '@shared/Component/select/select.component';
import { MultiSelectComponent } from '@shared/Component/multiselect/multiselect.component';
import { TableComponent } from '@shared/Component/table/table.component';
import { MainComponent } from './main.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { GroupComponent } from './group/group.component';
import { ProgramComponent } from './program/program.component';
import { DynamicHostDirective } from '@shared/Directive/dynamichost.Directive';
import { UnauthorizeComponent } from '@shared/Component/unauthorize/unauthorize.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from '@shared/Component/dashboard/dashboard.component';

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
    MenuComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([
      UserEffects,
      RoleEffects,
      GroupEffects,
      ProgramEffects,
      MenuEffects,
    ]),
    StoreModule.forRoot(ROOT_REDUCER),
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
