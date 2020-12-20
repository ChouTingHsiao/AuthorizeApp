import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from '@shared/Material/material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from '@shared/Component/login/login.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_REDUCER } from '@shared/Ngrx/Reducer/root.reducer';
import { UserEffects } from '@shared/Ngrx/Effects/user.effects';
import { RoleEffects } from '@shared/Ngrx/Effects/role.effects';
import { GroupEffects } from '@shared/Ngrx/Effects/group.effects';
import { ProgramEffects } from '@shared/Ngrx/Effects/program.effects';
import { MenuEffects } from '@shared/Ngrx/Effects/menu.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    EffectsModule.forRoot([
      UserEffects,
      RoleEffects,
      GroupEffects,
      ProgramEffects,
      MenuEffects,
    ]),
    StoreModule.forRoot(ROOT_REDUCER),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
