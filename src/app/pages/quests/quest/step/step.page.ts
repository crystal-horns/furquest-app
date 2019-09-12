import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {UserQuest} from '../../../../models/UserQuest';
import {environment} from '../../../../../environments/environment';
import {UserQuestStep} from '../../../../models/UserQuestStep';
import {StepsService} from '../../../../services/steps.service';
import {FinishStepComponent} from '../../../../components/quest/finish-step/finish-step.component';

@Component({
  selector: 'app-step',
  templateUrl: './step.page.html',
  styleUrls: ['./step.page.scss'],
})
export class StepPage implements OnInit {
  step: UserQuestStep;
  canGoBack = false;

  constructor(
      private router: Router,
      private activetedRoute: ActivatedRoute,
      private routerOutlet: IonRouterOutlet,
      private stepsService: StepsService,
      public modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    this.canGoBack = this.routerOutlet &&
        this.routerOutlet.canGoBack();

    const quets = this.activetedRoute.snapshot.paramMap.get('questId');
    const step = this.activetedRoute.snapshot.paramMap.get('stepId');
    this.step = await this.stepsService.getSingle(quets, step);
  }

  async finishStep() {
    switch (this.step.step.resolution_type) {
        // QRCode
        case 1:
            break;
        // Single and Many
        case 2:
        case 3:
            const modal = await this.modalCtrl.create({
                component: FinishStepComponent,
                componentProps: {
                    step: this.step
                }
            });
            return await modal.present();
    }
  }

}
