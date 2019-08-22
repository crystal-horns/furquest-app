import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private lang = [];

  constructor(
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      private translate: TranslateService,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.translate.get('app.loading').subscribe(trans => {
      this.lang['loading'] = trans;
    });
    this.translate.get('app.login.error').subscribe(trans => {
      this.lang['login.error'] = trans;
    });
  }

  async login(form) {
    const loading = await this.loadingCtrl.create({
      message: this.lang['loading'],
      duration: 2000
    });
    await loading.present();

    if (!this.authService.login(form.value)) {
      this.alertCtrl.create({
        header: 'Oops!',
        message: this.lang['login.error']
      })
    }
  }
}
