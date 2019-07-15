import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageLogoutComponent } from './page-logout/page-logout.component';


const routes: Routes = [
  { path: 'login', component: PageLoginComponent },
  { path: 'logout', component: PageLogoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesAuthRoutingModule { }
