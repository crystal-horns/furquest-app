import { Component, OnInit } from '@angular/core';
import {TextAnimation} from 'ngx-teximate';
import {bounceIn} from 'ng-animate';
import {ModalController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-finish-quest',
  templateUrl: './finish-quest.component.html',
  styleUrls: ['./finish-quest.component.scss'],
})
export class FinishQuestComponent implements OnInit {
  showClose = false;
  enterAnimation: TextAnimation = {
    animation: bounceIn,
    delay: 40,
    type: 'letter'
  };

  constructor(
      private modalCtrl: ModalController,
      public trans: TranslateService
  ) { }

  ngOnInit() {}

  async dismissModal(data) {
    await this.modalCtrl.dismiss(data);
  }
}
