import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/User';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-profile-comp',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData: User;
  imgPath = `${environment.resourceUrl}users/`;

  constructor(
      private router: Router,
      private menuCtrl: MenuController,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getAuthState().subscribe(async state => {
      if (state == 1) {
        this.userData = await this.authService.getUserData();
      }
    });
  }

  openProfile() {
    this.menuCtrl.close();
    this.router.navigate([`profile/${this.userData.id}`]);
  }
}
