import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from '../../../models/User';
import {UsersService} from '../../../services/users.service';
import {AuthService} from '../../../services/auth.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  user: User;
  imgPath = `${environment.resourceUrl}/users/`;
  segmentView = 'personalData';

  constructor(
      private usersService: UsersService,
      private authService: AuthService
  ) { }

  async ngOnInit() {
    this.user = await this.authService.getUserData();
  }

  segmentChanged(segment: CustomEvent) {
    this.segmentView = segment.detail.value;
  }

  save() {
    console.log('a');
  }
}
