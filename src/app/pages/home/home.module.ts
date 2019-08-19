import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import {TranslateModule} from "@ngx-translate/core";
import {UserModule} from "../../components/user/user.module";
import {QuestModule} from "../../components/quest/quest.module";

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule.forChild(routes),
      TranslateModule,
      UserModule,
      QuestModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
