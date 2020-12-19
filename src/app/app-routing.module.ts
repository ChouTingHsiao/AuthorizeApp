import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginGuard } from '@shared/Guard/LoginGuard';
import { LoginComponent } from '@shared/Component/login/login.component';
import { MainComponent } from './main/main.component';
import { MainModule } from './main/main.module';
import { UnauthorizeComponent } from '@shared/Component/unauthorize/unauthorize.component';


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
