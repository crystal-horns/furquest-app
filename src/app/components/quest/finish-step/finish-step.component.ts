import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {UserQuestStep} from '../../../models/UserQuestStep';

@Component({
  selector: 'app-finish-step',
  templateUrl: './finish-step.component.html',
  styleUrls: ['./finish-step.component.scss'],
})
export class FinishStepComponent implements OnInit {
  @Input() step: UserQuestStep;

  constructor(
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async dismissModal() {
    await this.modalCtrl.dismiss();
  }
}
