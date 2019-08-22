import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserQuestStep} from "../models/UserQuestStep";

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
    return <Promise<UserQuestStep>>this.http.get(`${this.stepsUrl}/${quest}/${step}`, httpOptions).toPromise();
  }
}
