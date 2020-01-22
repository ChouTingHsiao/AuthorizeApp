import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { GroupComponent } from './group/group.component';
import { DialogComponent } from './dialog/dialog.component';
import { InputComponent } from './shared/Component/input.component';
import { DynamicHostDirective } from './shared/Directive/dynamichost.Directive';


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
    DynamicHostDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
    InputComponent
  ]
})
export class AppModule { }
