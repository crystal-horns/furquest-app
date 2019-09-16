import { Component, OnInit } from '@angular/core';
import {ActionSheetController, IonRouterOutlet} from '@ionic/angular';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  canGoBack = false;

  constructor(
    private router: Router,
    private routerOutlet: IonRouterOutlet,
    private activetedRoute: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private translateService: TranslateService,
    private usersService: UsersService
  ) {}

  async ngOnInit() {
    this.canGoBack = this.routerOutlet &&
        this.routerOutlet.canGoBack();

    const id = this.activetedRoute.snapshot.paramMap.get('id');
    this.user = await this.usersService.getUser(id);
  }

  async presentProfileMenu() {
    const menu = await this.actionSheetController.create({
      header: this.translateService.instant('profile.menu.title'),
      buttons: [{
        text: this.translateService.instant('profile.menu.changePassword'),
        icon: 'key',
        handler: () => {
          this.router.navigate(['profile/change-password']);
        }
      }, {
        text: this.translateService.instant('profile.menu.edit'),
        icon: 'create',
        handler: () => {
          this.router.navigate(['profile/edit']);
        }
      }, {
        text: this.translateService.instant('profile.menu.editContacts'),
        icon: 'people',
        handler: () => {
          this.router.navigate(['profile/edit-contacts']);
        }
      }, {
        text: this.translateService.instant('profile.menu.editPicture'),
        icon: 'camera',
        handler: () => {
          this.router.navigate(['profile/edit']);
        }
      }]
    });
    await menu.present();
  }
}
