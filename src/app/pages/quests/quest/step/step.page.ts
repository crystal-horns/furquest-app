import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
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
  private stepRewards: object[];

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
    this.stepRewards = await this.stepsService.getRewards(quets, step);
  }

  goStep(quest, step) {
      this.router.navigate([`quests/${quest}/${step}`]);
  }

  async finishStep() {
      if (this.step.step.resolution_count === 0) {
          //
      } else {
          const modal = await this.modalCtrl.create({
              component: FinishStepComponent,
              componentProps: {
                  step: this.step
              }
          });
          modal.onDidDismiss()
              .then((data) => {
                  if (data) {
                      this.stepRewards = data as any;
                  }
              });
          return await modal.present();
      }
  }
}
