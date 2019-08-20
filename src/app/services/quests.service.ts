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
  private questCurrentUrl = environment.apiUrl + 'users/current/quests/current';
  private questAllUrl = environment.apiUrl + 'users/current/quests';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Gets current quest
   *
   * @return Promise<UserQuest>
   */
  getCurrent(): Promise<UserQuest> {
    return <Promise<UserQuest>>this.http.get(this.questCurrentUrl, httpOptions).toPromise();
  }

  /**
   * Gets all quests
   *
   * @return Promise<UserQuest[]>
   */
  getAll(): Promise<UserQuest[]> {
    return <Promise<UserQuest[]>>this.http.get(this.questAllUrl, httpOptions).toPromise();
  }
}
