import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuestPage } from './quest.page';
import {TranslateModule} from "@ngx-translate/core";
import {IonicHeaderParallaxModule} from 'ionic-header-parallax';

const routes: Routes = [
  {
    path: '',
    component: QuestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    IonicHeaderParallaxModule
  ],
  declarations: [QuestPage]
})
export class EventPageModule {}
