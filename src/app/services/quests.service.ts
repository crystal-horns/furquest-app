import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserQuest} from "../models/UserQuest";

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};
@Injectable({
  providedIn: 'root'
})
export class QuestsService {
  private questApiUrl = environment.apiUrl + 'users/current/quests';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Gets current quest
   *
   * @return Promise<UserQuest>
   */
  getCurrent(): Promise<UserQuest> {
    return <Promise<UserQuest>>this.http.get(`${this.questApiUrl}/current`, httpOptions).toPromise();
  }

  /**
   * Gets all quests
   *
   * @return Promise<UserQuest[]>
   */
  getCollection(): Promise<UserQuest[]> {
    return <Promise<UserQuest[]>>this.http.get(this.questApiUrl, httpOptions).toPromise();
  }

  /**
   * Gets quest by Id
   *
   * @param id
   * @return Promise<UserQuest>
   */
  getSingle(id): Promise<UserQuest> {
    return <Promise<UserQuest>>this.http.get(`${this.questApiUrl}/${id}`, httpOptions).toPromise();
  }
}
