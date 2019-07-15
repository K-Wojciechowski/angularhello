import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesAuthRoutingModule } from './pages-auth-routing.module';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageLogoutComponent } from './page-logout/page-logout.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageLoginComponent,
    PageLogoutComponent,
  ],
  imports: [
    CommonModule,
    PagesAuthRoutingModule,
    FormsModule
  ]
})
export class PagesAuthModule { }
