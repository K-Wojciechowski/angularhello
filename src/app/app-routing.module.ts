import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageAboutComponent } from './components/page-about/page-about.component';
import { PageContactComponent } from './components/page-contact/page-contact.component';
import { PageInboxComponent } from './components/page-inbox/page-inbox.component';

const routes: Routes = [
  { path: 'about', component: PageAboutComponent },
  { path: 'contact', component: PageContactComponent },
  { path: 'inbox', component: PageInboxComponent },
  {
    path: 'auth',
    loadChildren: () => import('./components/pages-auth/pages-auth.module').then(mod => mod.PagesAuthModule)
  },
  { path: '', component: PageHomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
