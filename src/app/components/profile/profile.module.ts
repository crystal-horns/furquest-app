import { NgModule } from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {UpdateAvatarComponent} from './update-avatar/update-avatar.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ],
  declarations: [
      UpdateAvatarComponent
  ],
  exports: [
    UpdateAvatarComponent
  ]
})
export class ProfileModule { }
