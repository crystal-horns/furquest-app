import { Component, OnInit } from '@angular/core';
import {IonRouterOutlet, MenuController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  canGoBack = false;

  constructor(
      private menuCtrl: MenuController,
      private routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {
    this.menuCtrl.close();
    this.canGoBack = this.routerOutlet && this.routerOutlet.canGoBack();
  }

}
