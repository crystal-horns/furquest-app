import { Component, OnInit } from '@angular/core';
import {QuestsService} from "../../services/quests.service";
import {UserQuest} from "../../models/UserQuest";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-events',
  templateUrl: './quests.page.html',
  styleUrls: ['./quests.page.scss'],
})
export class QuestsPage implements OnInit {
  private current: UserQuest;
  private quests: UserQuest[];
  private imagePath = environment.resourceUrl + "quests/";

  constructor(
      private router: Router,
      private questsService: QuestsService
  ) { }

  ngOnInit() {
    this.questsService.getAll().then((quests: UserQuest[]) => {
      quests.reverse();

      this.current = quests.shift();
      this.quests = quests;
    });
  }

  goQuest(id) {
    this.router.navigate([`quests/${id}`]);
  }
}
