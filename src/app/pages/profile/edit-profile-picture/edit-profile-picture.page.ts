import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/User';
import {AuthService} from '../../../services/auth.service';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../../services/users.service';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-profile-picture',
  templateUrl: './edit-profile-picture.page.html',
  styleUrls: ['./edit-profile-picture.page.scss'],
})
export class EditProfilePicturePage implements OnInit, AfterViewInit {
  user: User;
  imageFile: any = '';
  croppedImage: any = '';

  @ViewChild('inputcamera', {static: false}) cameraInput: ElementRef;

  constructor(
      private authService: AuthService,
      private usersService: UsersService,
      private alertController: AlertController,
      private changeDetector: ChangeDetectorRef,
      private translate: TranslateService,
  ) { }

  async ngOnInit() {
    this.user = await this.authService.getUserData();
  }

  ngAfterViewInit() {
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.onchange = () => {
      const reader = new FileReader();
      reader.onload = (r: any) => {
        this.imageFile = r.target.result;
      };
      reader.readAsDataURL(element.files[0]);
    };
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event);
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
      buttons: [this.translate.instant(`app.alerts.btn.ok`)]
    });

    await alert.present();
  }
}
