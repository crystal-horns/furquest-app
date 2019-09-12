import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserQuestStep} from '../models/UserQuestStep';
import {User} from '../models/User';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = environment.apiUrl + 'users';

  constructor(
      private http: HttpClient
  ) { }

  /**
   * Gets specific user's non-sensitive data (for profile)
   *
   * @param id
   * @return Promise<User>
   */
  getUser(id): Promise<User> {
    return this.http.get(`${this.usersUrl}/${id}`, httpOptions).toPromise() as Promise<User>;
  }
}
