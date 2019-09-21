import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StepPage } from './step.page';
import {TranslateModule} from '@ngx-translate/core';
import {QuestModule} from '../../../../components/quest/quest.module';
import {ObjectKeysPipe} from '../../../../pipes/object-keys.pipe';

const routes: Routes = [
  {
    path: '',
    component: StepPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    QuestModule
  ],
  declarations: [
      StepPage
  ]
})
export class StepPageModule {}
