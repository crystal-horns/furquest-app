import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {NavController, Platform} from "@ionic/angular";
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
      private navCtrl: NavController,
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
    this.http.post(this.logoutApi, {}, httpOptions).subscribe(() => {
      this.storage.remove('USER_DATA').then(() => {
        this.authState.next(2);
        this.router.navigate(['login']);
      });
    });
  }

  /**
   * Return the Auth Token or false
   * @return Promise<any>
   */
  getAuthToken(): Promise<any> {
    return this.storage.get('USER_DATA');
  }

  /**
   * Return Authetication state object
   * @return BehaviorSubject
   */
  getAuthState(): BehaviorSubject<number> {
    return this.authState;
  }
}