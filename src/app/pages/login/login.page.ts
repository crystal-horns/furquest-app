import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {NgxSpinnerService} from 'ngx-spinner';

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
      private authService: AuthService,
      private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {}

  async login(form) {
    await this.spinner.show('generalLoading');

    if (!this.authService.login(form.value)) {
      await this.alertCtrl.create({
        header: 'Oops!',
        message: this.translate.instant('app.login.error')
      });

      await this.spinner.hide('generalLoading');
    }
  }

  showLoginEvent() {
    this.showLogin = !this.showLogin;
  }
}
