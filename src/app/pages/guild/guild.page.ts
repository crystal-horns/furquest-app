import { Component, OnInit } from '@angular/core';
import {Guild} from '../../models/Guild';
import {GuildsService} from '../../services/guilds.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IonRouterOutlet} from '@ionic/angular';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.page.html',
  styleUrls: ['./guild.page.scss'],
})
export class GuildPage implements OnInit {
  guild: Guild;
  guildsImagePath = `${environment.resourceUrl}guilds/`;
  userImagePath = `${environment.resourceUrl}users/`;
  canGoBack = false;

  constructor(
      private guildService: GuildsService,

      private router: Router,
      private activetedRoute: ActivatedRoute,
      private routerOutlet: IonRouterOutlet
  ) { }

  async ngOnInit() {
    this.canGoBack = this.routerOutlet &&
        this.routerOutlet.canGoBack();

    const id = this.activetedRoute.snapshot.paramMap.get('guildId');
    this.guild = await this.guildService.getGuild(id);
  }

  openProfile(userId) {
    this.router.navigate([`profile/${userId}`]);
  }
}
