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
  private userCurrentApi: string = environment.apiUrl + 'users/current';

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
      // Get access token and store it
      this.http.post(this.loginApi, formData, httpOptions).subscribe(token => {
        this.storage.set('USER_DATA', token).then(() => {
          // Wiht the token store (so interceptor can use it), gets the user's profile and update stored data
          this.http.get(this.userCurrentApi, httpOptions).subscribe(data => {
            const userData = {...token, ...data};
            this.storage.set('USER_DATA', userData).then(() => {
              this.authState.next(1);
            });
          });
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
        this.router.navigate(['']);
      });
    });
  }

  /**
   * Return the Userdata storage
   * @return Promise<any>
   */
  getUserData(): Promise<any> {
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