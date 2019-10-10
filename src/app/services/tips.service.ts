import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserQuestStep} from '../models/UserQuestStep';
import {UserQuestStepTip} from '../models/UserQuestStepTip';
const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};
@Injectable({
  providedIn: 'root'
})
export class TipsService {
  private stepsUrl = environment.apiUrl + 'users/current/tips';

  constructor(
      private http: HttpClient
  ) { }

  /**
   * Process next tip and return a collection with all tips
   *
   * @param quest
   * @param step
   * @return Promise<UserQuestStepTip[]>
   */
  nextTip(quest, step): Promise<UserQuestStepTip[]> {
    return this.http.post(`${this.stepsUrl}/${quest}/${step}/next`, httpOptions).toPromise() as Promise<UserQuestStepTip[]>;
  }
}
