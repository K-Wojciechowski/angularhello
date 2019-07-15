import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, RouterEvent, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularhello';

  constructor(authService: AuthService, private router: Router) {
    this.router.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationStart) {
        if (!authService.isLoggedIn() && !e.url.startsWith('/auth')) {
          this.router.navigate(['/auth/login', {next: e.url}]);
        }
      }
    });
  }
}
