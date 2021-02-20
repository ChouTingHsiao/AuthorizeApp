import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@shared/Component/login/login.component';
import { UnauthorizeComponent } from '@shared/Component/unauthorize/unauthorize.component';
import { MainModule } from './main/main.module';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: '401', component: UnauthorizeComponent },
  {
    path: 'Main',
    loadChildren: () => import('./main/main-routing.module').then(m => m.MainRoutingModule)
  },
  { path: '', redirectTo: '/Main', pathMatch: 'full' },
  { path: '**', redirectTo: '/Main' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
