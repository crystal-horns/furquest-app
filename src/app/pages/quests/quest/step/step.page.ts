import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IonRouterOutlet} from "@ionic/angular";
import {UserQuest} from "../../../../models/UserQuest";
import {environment} from "../../../../../environments/environment";
import {UserQuestStep} from "../../../../models/UserQuestStep";
import {StepsService} from "../../../../services/steps.service";

@Component({
  selector: 'app-step',
  templateUrl: './step.page.html',
  styleUrls: ['./step.page.scss'],
})
export class StepPage implements OnInit {
  private step: UserQuestStep;
  canGoBack: boolean = false;

  constructor(
      private router: Router,
      private activetedRoute: ActivatedRoute,
      private routerOutlet: IonRouterOutlet,
      private stepsService: StepsService
  ) { }

  async ngOnInit() {
    this.canGoBack = this.routerOutlet &&
        this.routerOutlet.canGoBack();

    const quets = this.activetedRoute.snapshot.paramMap.get('questId');
    const step = this.activetedRoute.snapshot.paramMap.get('stepId');
    this.step = await this.stepsService.getSingle(quets, step);
  }

}
