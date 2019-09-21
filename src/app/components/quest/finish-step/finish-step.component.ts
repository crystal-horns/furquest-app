import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {AlertController, ModalController} from '@ionic/angular';
import {UserQuestStep} from '../../../models/UserQuestStep';
import {StepsService} from '../../../services/steps.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-finish-step',
  templateUrl: './finish-step.component.html',
  styleUrls: ['./finish-step.component.scss'],
})
export class FinishStepComponent implements OnInit {
  @Input() step: UserQuestStep;
  @ViewChild('formPuzzleResolution', {static: false}) formPuzzleResolutionEl;

  formPuzzleResolution = new FormGroup({
    answers: new FormArray([])
  });
  get answers(): FormArray { return this.formPuzzleResolution.get('answers') as FormArray; }

  constructor(
      private modalCtrl: ModalController,
      private alertCtrl: AlertController,
      private translate: TranslateService,
      private stepsService: StepsService
  ) { }

  ngOnInit() {
    for (let i = 0; this.step.step.resolution_count > i; i++) {
      this.answers.push(new FormControl());
    }
  }

  async dismissModal(data) {
    await this.modalCtrl.dismiss(data);
  }

  submitFormPuzzleResolution() {
    this.stepsService.finishStep(this.step.user_quest_id, this.step.id, this.formPuzzleResolution.value)
    .then(async res => {
      const alert = await this.alertCtrl.create({
        header: this.translate.instant(`step.finish.success.title`),
        message: this.translate.instant(`step.finish.success.msg`),
        buttons: ['Hurray!']
      });
      await alert.present();
      this.dismissModal(res);
    }).catch(async res => {
      const alert = await this.alertCtrl.create({
        header: 'Oops...',
        message: this.translate.instant(`step.finish.errors.${res.error.msg}`),
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}
