import { Component, OnInit } from '@angular/core';
import {IonRouterOutlet} from "@ionic/angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  canGoBack: boolean = false;

  constructor(private routerOutlet: IonRouterOutlet) {}

  ngOnInit() {
    this.canGoBack = this.routerOutlet &&
        this.routerOutlet.canGoBack();
  }
}
