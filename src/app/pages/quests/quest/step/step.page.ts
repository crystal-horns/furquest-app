import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {UserQuestStep} from '../../../../models/UserQuestStep';
import {StepsService} from '../../../../services/steps.service';
import {FinishStepComponent} from '../../../../components/quest/finish-step/finish-step.component';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from '@ionic-native/barcode-scanner/ngx';

declare var google;

@Component({
  selector: 'app-step',
  templateUrl: './step.page.html',
  styleUrls: ['./step.page.scss'],
})
export class StepPage implements OnInit {
  canGoBack = false;
  // Step data
  step: UserQuestStep;
  // Maps
  map;
  markers = [];
  // QRcode
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  // Reawrds
  stepRewards: object[];

  constructor(
    private router: Router,
    private activetedRoute: ActivatedRoute,
    private routerOutlet: IonRouterOutlet,
    private stepsService: StepsService,
    public modalCtrl: ModalController,
    private barcodeScanner: BarcodeScanner
  ) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  async ngOnInit() { }

  async ionViewWillEnter() {
    this.canGoBack = this.routerOutlet && this.routerOutlet.canGoBack();

    const quets = this.activetedRoute.snapshot.paramMap.get('questId');
    const step = this.activetedRoute.snapshot.paramMap.get('stepId');
    this.step = await this.stepsService.getSingle(quets, step);
    this.step.user_quest_step_tip = this.step.user_quest_step_tip.reverse();
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
        .scan()
        .then(barcodeData => {
          alert('Barcode data ' + JSON.stringify(barcodeData));
          this.scannedData = barcodeData;
        })
        .catch(err => {
          console.log('Error', err);
        });
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
            console.log(this.stepRewards);
          }
        });
    return await modal.present();
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
