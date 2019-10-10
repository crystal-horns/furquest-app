import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {QuestCurrentComponent} from './current/current.component';
import {FinishStepComponent} from './finish-step/finish-step.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot()
  ],
  declarations: [QuestCurrentComponent, FinishStepComponent],
  exports: [QuestCurrentComponent, FinishStepComponent],
  entryComponents: [FinishStepComponent]
})
export class QuestModule { }
