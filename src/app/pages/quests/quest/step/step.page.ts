import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IonRouterOutlet, ModalController, Platform} from '@ionic/angular';
import {UserQuestStep} from '../../../../models/UserQuestStep';
import {StepsService} from '../../../../services/steps.service';
import {FinishStepComponent} from '../../../../components/quest/finish-step/finish-step.component';

declare var google;

@Component({
  selector: 'app-step',
  templateUrl: './step.page.html',
  styleUrls: ['./step.page.scss'],
})
export class StepPage implements OnInit {
  step: UserQuestStep;
  canGoBack = false;
  stepRewards: object[];
  map;
  markers = [];

  constructor(
    private router: Router,
    private activetedRoute: ActivatedRoute,
    private routerOutlet: IonRouterOutlet,
    private stepsService: StepsService,
    public modalCtrl: ModalController,
    private platform: Platform
  ) { }

  async ngOnInit() {
    this.canGoBack = this.routerOutlet &&
    this.routerOutlet.canGoBack();

    const quets = this.activetedRoute.snapshot.paramMap.get('questId');
    const step = this.activetedRoute.snapshot.paramMap.get('stepId');
    this.step = await this.stepsService.getSingle(quets, step);
    this.stepRewards = await this.stepsService.getRewards(quets, step);

    await this.platform.ready();
    await this.loadMap();
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
