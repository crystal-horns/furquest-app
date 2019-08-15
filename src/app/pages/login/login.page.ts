import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
      private alertCtrl: AlertController,
      private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login(form) {
    if (!this.authService.login(form.value)) {
      this.alertCtrl.create({
        header: 'Oops!',
        message: 'Não foi possível '
      })
    }
  }
}
