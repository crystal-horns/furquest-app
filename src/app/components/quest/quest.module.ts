import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {QuestCurrentComponent} from './current/current.component';
import {FinishStepComponent} from './finish-step/finish-step.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule.forRoot()
  ],
  declarations: [QuestCurrentComponent, FinishStepComponent],
  exports: [QuestCurrentComponent, FinishStepComponent],
  entryComponents: [FinishStepComponent]
})
export class QuestModule { }
