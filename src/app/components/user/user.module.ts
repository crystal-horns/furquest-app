import { NgModule } from '@angular/core';
import {ProfileComponent} from "./profile/profile.component";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ],
  declarations: [
      ProfileComponent
  ],
  exports: [
    ProfileComponent
  ]
})
export class UserModule { }
