import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class GuildsService {
  private guildsUrl = environment.apiUrl + 'guilds';

  constructor(
      private http: HttpClient
  ) { }

  /**
   * Gets guild data
   *
   * @param id
   * @return Promise<any>
   */
  getGuild(id): Promise<any> {
    return this.http.get(`${this.guildsUrl}/${id}`, httpOptions).toPromise() as Promise<any>;
  }
}
