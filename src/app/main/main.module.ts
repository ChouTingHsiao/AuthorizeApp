import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';

import { MaterialModule } from '@shared/Material/material.module';
import { TableModule } from '@shared/Component/table/table.module';
import { DirectiveModule } from '@shared/Directive/Directive.module';

import { MainComponent } from '@main/main.component';
import { UserComponent } from '@main/user/user.component';
import { RoleComponent } from '@main/role/role.component';
import { GroupComponent } from '@main/group/group.component';
import { ProgramComponent } from '@main/program/program.component';
import { MenuComponent } from '@main/menu/menu.component';

import { DashboardComponent } from '@shared/Component/dashboard/dashboard.component';
import { UnauthorizeComponent } from '@shared/Component/unauthorize/unauthorize.component';

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
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MainRoutingModule,
    TableModule,
    DirectiveModule,
  ],
})
export class MainModule { }
