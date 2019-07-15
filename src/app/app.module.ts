import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageAboutComponent } from './components/page-about/page-about.component';
import { PageContactComponent } from './components/page-contact/page-contact.component';
import { PageInboxComponent } from './components/page-inbox/page-inbox.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token-interceptor';
import { AuthService } from './services/auth.service';
import { SortableThComponent } from './components/sortable-th/sortable-th.component';

function appInitializerFactory(authService: AuthService) {
  return () => new Promise((resolve, reject) => {
    authService.restoreFromLS(resolve);
  });
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageHomeComponent,
    PageAboutComponent,
    PageContactComponent,
    PageInboxComponent,
    SortableThComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      multi: true,
      deps: [AuthService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
