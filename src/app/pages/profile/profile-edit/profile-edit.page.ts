import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from '../../../models/User';
import {UsersService} from '../../../services/users.service';
import {AuthService} from '../../../services/auth.service';
import {environment} from '../../../../environments/environment';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  user: User;

  constructor(
      private usersService: UsersService,
      private authService: AuthService,
      private alertController: AlertController,
      private translate: TranslateService
  ) { }

  async ngOnInit() {
    this.user = await this.authService.getUserData();
  }

  async save() {
    this.usersService.saveUser(this.user).then(res => {
      this.authService.setUserData(this.user);
      this.presentAlert(this.translate.instant('app.alerts.success'), this.translate.instant('profileEdit.alertMessages.success'));
    }).catch(res => {
      this.presentAlert(this.translate.instant('app.alerts.error'), this.translate.instant('app.alertMessages.error'));
    });
  }

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Okay']
    });

    await alert.present();
  }
}
