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

  /**
   * Saves user data
   *
   * @param user
   * @return Promise<User>
   */
  saveUser(user: User): Promise<User> {
    let data: object = (
        ({ name, social_name, species, bio, document, document_type }) =>
            ({ name, social_name, species, bio, document, document_type })
    )(user);
    data = {...data, _method: 'PUT'};
    return this.http.post(`${this.usersUrl}/current/edit`, data, httpOptions).toPromise() as Promise<User>;
  }
}
