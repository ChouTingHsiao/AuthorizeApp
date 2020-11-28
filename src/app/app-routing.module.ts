import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '@shared/Guard/LoginGuard';
import { LoginComponent } from '@shared/Component/login/login.component';
import { MainComponent } from './main/main.component';
import { MainModule } from './main/main.module';


const routes: Routes = [
  {  path: '',   redirectTo: '/Main', pathMatch: 'full' },
  {  path: 'Login', component: LoginComponent  },
  {  path: 'Main', component: MainComponent, canActivate: [LoginGuard] },
  {  path: '**', redirectTo: '/Main' }
];

@NgModule({
  imports: [
    MainModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
