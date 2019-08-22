import { Component, OnInit } from '@angular/core';
import {QuestsService} from "../../../services/quests.service";
import {UserQuest} from "../../../models/UserQuest";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quest-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class QuestCurrentComponent implements OnInit {
  currentQuest: UserQuest;
  imagePath = environment.resourceUrl + "quests/";

  constructor(
      private questService: QuestsService,
      private router: Router
  ) { }

  async ngOnInit() {
    this.currentQuest = await this.questService.getCurrent();
  }

  goCurrentQuest() {
    this.router.navigate([`quests/${this.currentQuest.id}`]);
  }
}
