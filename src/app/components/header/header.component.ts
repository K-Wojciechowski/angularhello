import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  sub: Subscription;
  currentUser: UserModel = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.sub = this.authService.getCurrentUserObservable().subscribe((newUser: UserModel) => {
      this.currentUser = newUser;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
