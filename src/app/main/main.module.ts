import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainRoutingModule } from './main-routing.module';

import { MaterialModule } from '@shared/Material/material.module';

import { MainComponent } from '@main/main.component';
import { UserComponent } from '@main/user/user.component';
import { RoleComponent } from '@main/role/role.component';
import { GroupComponent } from '@main/group/group.component';
import { ProgramComponent } from '@main/program/program.component';
import { MenuComponent } from '@main/menu/menu.component';

import { DashboardComponent } from '@shared/Component/dashboard/dashboard.component';
import { UnauthorizeComponent } from '@shared/Component/unauthorize/unauthorize.component';

import { TableModule } from '@shared/Component/table/table.module';

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
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MainRoutingModule,
    MaterialModule,
    TableModule,
  ],
})
export class MainModule { }
