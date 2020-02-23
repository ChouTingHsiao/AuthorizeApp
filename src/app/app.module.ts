import { BrowserModule  } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';

import { MaterialModule  } from '@src/material-module';

import { AppRoutingModule } from './app-routing.module';
import { MainRoutingModule } from './main/main-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment'; // Angular CLI environment

import { UserService } from '@services/user/user.service';
import { RoleService } from '@services/role/role.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
