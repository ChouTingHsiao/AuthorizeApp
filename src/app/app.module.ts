import { BrowserModule  } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';

import { MaterialModule  } from '@src/material-module';

import { AppRoutingModule } from './app-routing.module';
import { MainRoutingModule } from './main/main-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';



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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
