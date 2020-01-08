import {Component, Input, OnInit} from '@angular/core';
import {UserQuestStepTip} from '../../../models/UserQuestStepTip';
import {ModalController} from '@ionic/angular';
import {bounceIn} from 'ng-animate';
import {TextAnimation} from 'ngx-teximate';

@Component({
  selector: 'app-next-tip',
  templateUrl: './next-tip.component.html',
  styleUrls: ['./next-tip.component.scss'],
})
export class NextTipComponent implements OnInit {
  @Input() tip: UserQuestStepTip;
  showClose = false;
  enterAnimation: TextAnimation = {
    animation: bounceIn,
    delay: 40,
    type: 'letter'
  };

  constructor(
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async dismissModal(data) {
    await this.modalCtrl.dismiss(data);
  }
}
