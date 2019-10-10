import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserQuestStep} from '../models/UserQuestStep';
import {StepReward} from '../models/StepReward';
import {Step} from '../models/Step';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};
@Injectable({
  providedIn: 'root'
})
export class StepsService {
  private stepsUrl = environment.apiUrl + 'users/current/steps';

  constructor(
      private http: HttpClient
  ) { }

  /**
   * Get step details and avaliable tips by quest_id and step_id
   *
   * @param quest
   * @param step
   * @return Promise<UserQuestStep>
   */
  getSingle(quest, step): Promise<UserQuestStep> {
    return this.http.get(`${this.stepsUrl}/${quest}/${step}`, httpOptions).toPromise() as Promise<UserQuestStep>;
  }

  /**
   * Sends resolution to validation and finish step
   *
   * @param quest
   * @param step
   * @param data
   * @return Promise<any>
   */
  finishStep(quest, step, data): Promise<any> {
    return this.http.post(`${this.stepsUrl}/${quest}/${step}/finish`, data, httpOptions).toPromise() as Promise<any>;
  }

  /**
   * Gets the finished step's rewards
   *
   * @param quest
   * @param step
   * @return Promise<any>
   */
  getRewards(quest, step): Promise<any> {
    return this.http.get(`${this.stepsUrl}/${quest}/${step}/rewards`, httpOptions).toPromise() as Promise<any>;
  }
}
