import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/User';
import {AuthService} from '../../../services/auth.service';
import {UsersService} from '../../../services/users.service';
import {AlertController, NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  user: User;
  public changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private alertController: AlertController,
    private translate: TranslateService,
    private navCtrl: NavController
  ) {
    this.buildForm();
  }

  async ngOnInit() {
    this.user = await this.authService.getUserData();
  }

  public buildForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.required
        ])
      ),
      confirmPassword: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.required
        ])
      ),
    }, {
      validators: this.MatchPassword.bind(this)
    });
  }

  private MatchPassword(formGroup: FormGroup) {
    const { value: password } = formGroup.get('newPassword');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    if (confirmPassword) {
      return password === confirmPassword ? null : { passwordNotMatch: true };
    }
  }

  async save() {
    this.usersService.changePassword(this.changePasswordForm.controls).then(res => {
      this.presentAlert(this.translate.instant('app.alerts.success'), this.translate.instant('profileEdit.alertMessages.success'));
      this.navCtrl.back();
    }).catch(res => {
      this.presentAlert(this.translate.instant('app.alerts.error'), this.translate.instant('app.alertMessages.error'));
    });
  }

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [this.translate.instant(`app.alerts.btn.ok`)]
    });

    await alert.present();
  }
}
