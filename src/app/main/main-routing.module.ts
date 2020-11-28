import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '@shared/Guard/LoginGuard';
import { AuthGuard } from '@shared/Guard/AuthGuard';
import { DashboardComponent } from '@shared/Component/dashboard/dashboard.component';
import { UnauthorizeComponent } from '@shared/Component/unauthorize/unauthorize.component';
import { LoginComponent } from '@shared/Component/login/login.component';
import { MainComponent } from './main.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { GroupComponent } from './group/group.component';
import { ProgramComponent } from './program/program.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {  path: '',   redirectTo: '/Main', pathMatch: 'full'  },
  {  path: 'Login', component: LoginComponent  },
  {  path: '401', component: UnauthorizeComponent  },
  {  path: 'Main', component: MainComponent, canActivate: [LoginGuard],
    children: [
          {  path: 'User', component: UserComponent, canActivate: [AuthGuard] },
          {  path: 'Role', component: RoleComponent, canActivate: [AuthGuard]  },
          {  path: 'Group', component: GroupComponent, canActivate: [AuthGuard]  },
          {  path: 'Program', component: ProgramComponent, canActivate: [AuthGuard]  },
          {  path: 'Menu', component: MenuComponent, canActivate: [AuthGuard]  },
          {  path: 'Dashboard', component: DashboardComponent, canActivate: [LoginGuard] },
          {  path: '**', redirectTo: '/Main/Dashboard'  }
    ]
  },
  {  path: '**', redirectTo: '/Main' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
