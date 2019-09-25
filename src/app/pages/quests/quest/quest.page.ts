import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuestsService} from "../../../services/quests.service";
import {UserQuest} from "../../../models/UserQuest";
import {environment} from "../../../../environments/environment";
import {IonRouterOutlet} from "@ionic/angular";

@Component({
  selector: 'app-event',
  templateUrl: './quest.page.html',
  styleUrls: ['./quest.page.scss'],
})
export class QuestPage implements OnInit {
  quest: UserQuest;
  imagePath = environment.resourceUrl + "quests/";
  canGoBack: boolean = false;

  constructor(
      private router: Router,
      private activetedRoute: ActivatedRoute,
      private routerOutlet: IonRouterOutlet,
      private questsService: QuestsService
  ) { }

  async ngOnInit() {
    this.canGoBack = this.routerOutlet &&
        this.routerOutlet.canGoBack();

    const id = this.activetedRoute.snapshot.paramMap.get('questId');
    this.quest = await this.questsService.getSingle(id);
    this.quest.user_quest_steps = this.quest.user_quest_steps.reverse();
  }

  goStep(id) {
    this.router.navigate([`quests/${this.quest.id}/${id}`]);
  }
}
