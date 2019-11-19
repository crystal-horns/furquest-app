import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {QuestCurrentComponent} from './current/current.component';
import {FinishStepComponent} from './finish-step/finish-step.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NextTipComponent} from './next-tip/next-tip.component';
import {TeximateModule} from 'ngx-teximate';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    TeximateModule
  ],
  declarations: [QuestCurrentComponent, FinishStepComponent, NextTipComponent],
  exports: [QuestCurrentComponent, FinishStepComponent, NextTipComponent],
  entryComponents: [FinishStepComponent, NextTipComponent]
})
export class QuestModule { }
