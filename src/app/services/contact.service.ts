import { Injectable } from '@angular/core';
import { StatusMessageModel } from '../models/status-message.model';
import { HttpClient } from '@angular/common/http';
import { ContactMessageModel } from '../models/contact-message.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(
    private http: HttpClient
  ) { }

  send(message: ContactMessageModel): Observable<StatusMessageModel> {
    return this.http.post<StatusMessageModel>(environment.api + '/contact', message);
  }
}
