import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@shared/Component/login/login.component';
import { UnauthorizeComponent } from '@shared/Component/unauthorize/unauthorize.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: '401', component: UnauthorizeComponent },
  {
    path: 'Main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  { path: '', redirectTo: 'Main', pathMatch: 'full' },
  { path: '**', redirectTo: 'Main' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
