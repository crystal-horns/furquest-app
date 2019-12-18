import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditProfilePicturePage } from './edit-profile-picture.page';
import {TranslateModule} from '@ngx-translate/core';
import { ImageCropperModule } from 'ngx-image-cropper';

const routes: Routes = [
  {
    path: '',
    component: EditProfilePicturePage
  }
];

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      TranslateModule,
      ImageCropperModule
  ],
  declarations: [EditProfilePicturePage]
})
export class EditProfilePicturePageModule {}
