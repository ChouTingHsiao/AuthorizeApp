import { BrowserModule  } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { MaterialModule  } from '../material-module';
import { StoreModule } from '@ngrx/store';
import { maintainReducer } from '@shared/Reducer/maintain.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { GroupComponent } from './group/group.component';
import { DialogComponent } from '@shared/Component/dialog.component';
import { InputComponent } from '@shared/Component/input.component';
import { LabelComponent } from '@shared/Component/label.component';
import { TableComponent } from '@shared/Component/table.component';
import { DynamicHostDirective } from '@shared/Directive/dynamichost.Directive';
import { ProgramComponent } from './program/program.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    UserComponent,
    RoleComponent,
    GroupComponent,
    DialogComponent,
    InputComponent,
    LabelComponent,
    TableComponent,
    DynamicHostDirective,
    ProgramComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot({ maintainReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
    InputComponent,
    LabelComponent,
    TableComponent
  ]
})
export class AppModule {}
