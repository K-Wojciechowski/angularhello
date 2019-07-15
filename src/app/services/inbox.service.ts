import { Injectable } from '@angular/core';
import { StatusMessageModel } from '../models/status-message.model';
import { HttpClient } from '@angular/common/http';
import { ContactMessageModel } from '../models/contact-message.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InboxService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getInboxMessages(): Observable<ContactMessageModel[]> {
    if (this.authService.currentUser.isAdmin) {
      return this.http.get<ContactMessageModel[]>(environment.api + '/inbox');
    } else {
      return throwError({error: new StatusMessageModel(false, 'Not an admin')});
    }
  }

  deleteAllInboxMessages(): Observable<StatusMessageModel> {
    if (this.authService.currentUser.isAdmin) {
      return this.http.delete<StatusMessageModel>(environment.api + '/inbox');
    } else {
      return throwError({error: new StatusMessageModel(false, 'Not an admin')});
    }
  }
}
