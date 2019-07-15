import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-logout',
  templateUrl: './page-logout.component.html',
  styleUrls: ['./page-logout.component.css']
})
export class PageLogoutComponent implements OnInit, OnDestroy {
  private timeRemaining: number;
  private timeoutHandle: number;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logoutTimer() {
    this.timeRemaining -= 1;
    if (this.timeRemaining <= 0) {
      this.router.navigate(['/auth/login']);
    } else {
      this.timeoutHandle = window.setTimeout(() => this.logoutTimer(), 100);
    }
  }

  ngOnInit() {
    this.authService.logOut();
    this.timeRemaining = 30;
    this.timeoutHandle = window.setTimeout(() => this.logoutTimer(), 100);
  }

  ngOnDestroy() {
    if (this.timeoutHandle !== -1) {
      window.clearTimeout(this.timeoutHandle);
    }
  }
}
