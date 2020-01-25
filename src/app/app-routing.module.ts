import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './_utility/LoginGuard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  {  path: '',   redirectTo: '/Main', pathMatch: 'full'  },
  {  path: 'Login', component: LoginComponent  },
  {  path: 'Main', component: MainComponent, canActivate: [LoginGuard],
    children: [
          {  path: 'User', component: UserComponent  },
          {  path: 'Role', component: RoleComponent  },
          {  path: 'Group', component: GroupComponent  },
          {  path: '**', redirectTo: '/Main'  }
    ]
   },
  {  path: '**', redirectTo: '/Main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
