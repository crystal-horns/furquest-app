import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: BehaviorSubject<number> = new BehaviorSubject(0);
  private loginApi: string = environment.apiUrl + 'login';
  private logoutApi: string = environment.apiUrl + 'logout';

  constructor(
      private router: Router,
      private platform: Platform,
      private storage: Storage,
      private http: HttpClient
  ) {
    this.platform.ready().then(() => {
      this.storage.get('USER_DATA').then(response => {
        this.authState.next(response ? 1 : 2);
      });
    });
  }

  /**
   * Authenticate and login user
   * @param formData
   * @return void|HttpErrorResponse
   */
  login(formData) {
    try {
      this.http.post(this.loginApi, formData, httpOptions).subscribe(response => {
        this.storage.set('USER_DATA', response).then(() => {
          this.authState.next(1);
          console.log(this.storage.get('USER_DATA'));
          this.router.navigate(['home']);
        });
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /**
   * Logout the current user
   */
  logout() {
    let logoutHeader = {...httpOptions};
    this.storage.get('USER_DATA').then(data => {
      logoutHeader.headers.set('authorization', 'Bearer ' + data.access_token);
    });
    this.http.post(this.logoutApi, {}, logoutHeader).subscribe(() => {
      this.storage.remove('USER_DATA').then(() => {
        this.authState.next(2);
        this.router.navigate(['login']);
      });
    });
  }

  /**
   * Return the Auth Token or false
   * @return string
   */
  getAuthToken() {
    this.storage.get('USER_DATA').then(data => {
      return data.access_token;
    });
  }

  /**
   * Return Authetication state object
   * @return BehaviorSubject
   */
  getAuthState(): BehaviorSubject<number> {
    return this.authState;
  }
}