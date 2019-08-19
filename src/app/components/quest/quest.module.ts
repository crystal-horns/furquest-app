import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {QuestCurrentComponent} from "./current/current.component";



@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  declarations: [QuestCurrentComponent],
  exports: [QuestCurrentComponent]
})
export class QuestModule { }
