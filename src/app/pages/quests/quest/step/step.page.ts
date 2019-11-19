import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, IonRouterOutlet, ModalController} from '@ionic/angular';
import {UserQuestStep} from '../../../../models/UserQuestStep';
import {StepsService} from '../../../../services/steps.service';
import {FinishStepComponent} from '../../../../components/quest/finish-step/finish-step.component';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from '@ionic-native/barcode-scanner/ngx';
import {TipsService} from '../../../../services/tips.service';
import {TranslateService} from '@ngx-translate/core';
import {NextTipComponent} from '../../../../components/quest/next-tip/next-tip.component';

declare var google;

@Component({
  selector: 'app-step',
  templateUrl: './step.page.html',
  styleUrls: ['./step.page.scss'],
})
export class StepPage implements OnInit {
  canGoBack = false;
  math = Math;
  // Step data
  step: UserQuestStep;
  // Tips
  timeNextTip = 0;
  delayNextTip = 0;
  porcTimeNextTip = 0;
  nextTip = false;
  // Maps
  map;
  markers = [];
  // QRcode
  barcodeScannerOptions: BarcodeScannerOptions;
  // Reawrds
  stepRewards: object[];

  constructor(
      private stepsService: StepsService,
      private tipsService: TipsService,
      private router: Router,
      private activetedRoute: ActivatedRoute,
      private routerOutlet: IonRouterOutlet,
      public modalCtrl: ModalController,
      private barcodeScanner: BarcodeScanner,
      private translate: TranslateService,
      private alertCtrl: AlertController
  ) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  async ngOnInit() {}

  async ionViewWillEnter() {
    this.canGoBack = this.routerOutlet && this.routerOutlet.canGoBack();

    const quets = this.activetedRoute.snapshot.paramMap.get('questId');
    const step = this.activetedRoute.snapshot.paramMap.get('stepId');
    this.stepsService.getSingle(quets, step).then(res => {
      this.step = res;
      this.calcTimerNextTip();

      this.step.user_quest_step_tip = this.step.user_quest_step_tip.reverse();
    });
    this.stepRewards = await this.stepsService.getRewards(quets, step);

    await this.loadMap();
  }

  goStep(quest, step) {
    this.router.navigate([`quests/${quest}/${step}`]);
  }

  async finishStep() {
    if (this.step.step.resolution_count === 0) {
      this.scanCode();
    } else {
      this.showModal();
    }
  }

  scanCode() {
    this.barcodeScanner
        .scan({
          prompt: this.translate.instant('step.finish.fallback')
        })
        .then(barcodeData => {
          this.processQrCode(barcodeData.text);
        })
        .catch(err => {
          console.log('Error', err);
          this.processQrCode(prompt(this.translate.instant('step.finish.fallback')));
        });
  }
  async processQrCode(response) {
    if (response) {
      this.stepsService.finishStep(this.step.user_quest_id, this.step.id, {answers: [response]})
          .then(async res => {
            const alert = await this.alertCtrl.create({
              header: this.translate.instant(`step.finish.success.title`),
              message: this.translate.instant(`step.finish.success.msg`),
              buttons: ['Hurray!']
            });
            await alert.present();
          }).catch(async res => {
        const alert = await this.alertCtrl.create({
          header: this.translate.instant(`app.alerts.error`),
          message: this.translate.instant(`step.finish.errors.${res.error.msg}`),
          buttons: [this.translate.instant(`app.alerts.btn.ok`)]
        });
        await alert.present();
      });
    } else {
      const alert = await this.alertCtrl.create({
        header: this.translate.instant(`app.alerts.error`),
        message: this.translate.instant(`step.finish.errors.empty`),
        buttons: [this.translate.instant(`app.alerts.btn.ok`)]
      });
      await alert.present();
    }
  }

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: FinishStepComponent,
      componentProps: {
        step: this.step
      }
    });
    modal.onDidDismiss()
        .then((data) => {
          if (data) {
            this.stepRewards = data.data as object[];
          }
        });
    return await modal.present();
  }

  calcTimerNextTip() {
    if (this.step.status == 1) {
      return;
    }

    let user_quest_step_tips = this.step.user_quest_step_tip;
    if (user_quest_step_tips.length) {
      let user_quest_step_tip = user_quest_step_tips.reverse()[0];
      this.delayNextTip = user_quest_step_tip.tip.delay;
      let created = Date.parse(user_quest_step_tip.created_at + ' GMT-3');
      this.timeNextTip = this.delayNextTip - this.math.floor(( (new Date()).getTime() - created ) / 1000);
      this.porcTimeNextTip = (this.delayNextTip - this.timeNextTip) / this.delayNextTip;

      if(this.timeNextTip > 0) {
        this.timerNextTipTick();
      } else {
        this.nextTip = true;
      }
    } else {
      this.nextTip = true;
    }
  }

  timerNextTipTick() {
    setTimeout(x => {
      this.timeNextTip -= 1;
      this.porcTimeNextTip = (this.delayNextTip - this.timeNextTip) / this.delayNextTip;

      if(this.timeNextTip > 0) {
        this.nextTip = false;
        this.timerNextTipTick();
      } else {
        this.nextTip = true;
      }
    }, 1000);
  }

  async getNextTip() {
    this.tipsService.nextTip(this.step.user_quest_id, this.step.id).then(async tips => {
      this.step.user_quest_step_tip = tips;
      this.calcTimerNextTip();

      const modal = await this.modalCtrl.create({
        component: NextTipComponent,
        componentProps: {
          tip: tips.reverse()[0]
        }
      });
      return await modal.present();
    });
  }

  loadMap() {
    const mapTip = this.step.user_quest_step_tip.filter((value) => value.tip.map);
    const mapPoints = mapTip[0].tip.content.split(',');

    const latLng = new google.maps.LatLng(mapPoints[0], mapPoints[1]);

    const mapOptions = {
      center: latLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById('map_container'), mapOptions);

    this.markers.map(m => m.setMap(null));
    this.markers = [];

    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    this.markers.push(marker);
  }
}
