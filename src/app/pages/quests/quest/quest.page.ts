import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuestsService} from "../../../services/quests.service";
import {UserQuest} from "../../../models/UserQuest";
import {environment} from "../../../../environments/environment";
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {FinishQuestComponent} from '../../../components/quest/finish-quest/finish-quest.component';

@Component({
  selector: 'app-event',
  templateUrl: './quest.page.html',
  styleUrls: ['./quest.page.scss'],
})
export class QuestPage implements OnInit {
  quest: UserQuest;
  imagePath = environment.resourceUrl + "quests/";
  canGoBack = false;

  progress = 0;
  historyExpand = false;

  constructor(
      private router: Router,
      private activetedRoute: ActivatedRoute,
      private routerOutlet: IonRouterOutlet,
      private questsService: QuestsService,
      public modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    this.canGoBack = this.routerOutlet &&
        this.routerOutlet.canGoBack();
  }
  async ionViewWillEnter() {
    const id = this.activetedRoute.snapshot.paramMap.get('questId');
    this.quest = await this.questsService.getSingle(id);
    this.quest.user_quest_steps = this.quest.user_quest_steps.reverse();

    let stepFinished = 0;
    this.quest.user_quest_steps.map(quest => {
      if (quest.status) {
        stepFinished++;
      }
    });

    this.progress = stepFinished / this.quest.quest_route.quest.step_count;
  }

  goStep(id) {
    this.router.navigate([`quests/${this.quest.id}/${id}`]);
  }

  toggleHistoryExpand() {
    this.historyExpand = !this.historyExpand;
  }

  async finishQuest() {
    const modalFinishQuest = await this.modalCtrl.create({
      component: FinishQuestComponent
    });
    await modalFinishQuest.present();
  }

  doRefresh(e) {
    this.ionViewWillEnter().then(() => {
      e.target.complete();
    });
  }
}
