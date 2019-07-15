import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../../../interfaces/user.interface';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusMessageModel } from 'src/app/models/status-message.model';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {
  userData: UserInterface = { name: '', password: '' };
  error = '';
  nextUrl = '/';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params.next !== undefined) {
        this.nextUrl = params.next;
        this.error = 'You must log in first.';
      } else {
        this.nextUrl = '/';
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    this.authService.logIn(this.userData).subscribe((status: StatusMessageModel) => {
      this.loading = false;
      if (status.success) {
        this.router.navigate([this.nextUrl]);
      } else {
        this.error = status.message;
      }
    });
  }
}
