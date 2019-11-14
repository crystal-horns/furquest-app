import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private showLogin = false;

  constructor(
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      private translate: TranslateService,
      private authService: AuthService
  ) { }

  ngOnInit() { }

  async login(form) {
    const loading = await this.loadingCtrl.create({
      message: this.translate.instant('app.loading'),
      duration: 2000
    });
    await loading.present();

    if (!this.authService.login(form.value)) {
      this.alertCtrl.create({
        header: 'Oops!',
        message: this.translate.instant('app.login.error')
      });
    }
  }

  showLoginEvent() {
    this.showLogin = !this.showLogin;
  }
}
