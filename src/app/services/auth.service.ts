import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { UserModel } from '../models/user.model';
import { StatusMessageModel } from '../models/status-message.model';
import { UserInterface } from '../interfaces/user.interface';
import { LoginResponseInterface } from '../interfaces/login-response.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const LS_TOKEN_KEY = 'token';
const LS_USERNAME_KEY = 'username';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser: UserModel = null;
  private currentUserObservableCallback: (user: UserModel) => void;
  currentUserObservable: Observable<UserModel> = new Observable<UserModel>((observer) => {
      this.currentUserObservableCallback = (user: UserModel) => observer.next(user);
      if (this._currentUser !== null) {
        observer.next(this._currentUser);
      }
      return () => {
        this.currentUserObservableCallback = undefined;
      };
    });

  get currentUser(): UserModel {
    return this._currentUser;
  }

  set currentUser(user: UserModel) {
    this._currentUser = user;
    if (this.currentUserObservableCallback !== undefined) {
      this.currentUserObservableCallback(user);
    }
  }

  constructor(
    private http: HttpClient,
  ) {
  }

  restoreFromLS(resolve) {
    // Restore state from local storage
    const token = window.localStorage.getItem(LS_TOKEN_KEY);
    if (token !== null) {
      this.validateToken(token).subscribe(
        (loginRepsonse: LoginResponseInterface) => {
          this.setCurrentUserFromLoginResponse(loginRepsonse);
          resolve();
        },
        error => {
          console.log(error);
          this.currentUser = null;
          this.saveToLS(token);
          resolve();
        });
    } else {
      resolve();
    }
  }

  private saveToLS(token: string) {
    if (this.currentUser === null) {
      window.localStorage.removeItem(LS_TOKEN_KEY);
      window.localStorage.removeItem(LS_USERNAME_KEY);
    } else {
      window.localStorage.setItem(LS_TOKEN_KEY, token);
      window.localStorage.setItem(LS_USERNAME_KEY, this.currentUser.name);
    }
  }

  validateToken(token: string) {
    return this.http.post<LoginResponseInterface>(environment.api + '/auth/validate', { token });
  }

  getCurrentUserObservable(): Observable<UserModel> {
    return this.currentUserObservable;
  }

  setCurrentUserFromLoginResponse(loginResponse: LoginResponseInterface) {
    this.currentUser = UserModel.wrap(loginResponse.user);
  }

  logIn(inputUser: UserInterface): Observable<StatusMessageModel> {
    let emitter: Subscriber<StatusMessageModel>;
    const observable = new Observable<StatusMessageModel>(e => emitter = e);
    this.http.post<LoginResponseInterface>(environment.api + '/auth/login', inputUser).subscribe(
      (loginResponse: LoginResponseInterface) => {
        this.setCurrentUserFromLoginResponse(loginResponse);
        this.saveToLS(loginResponse.token);
        emitter.next(new StatusMessageModel(true));
      },
      error => emitter.next(error.error)
    );
    return observable;
  }

  logOut() {
    this.currentUser = null;
    this.saveToLS(null);
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getToken(): string {
    return window.localStorage.getItem(LS_TOKEN_KEY);
  }
}
