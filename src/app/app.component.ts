import { Component } from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from "./services/auth.service";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {LanguageService} from "./services/language.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService,
    private languageService: LanguageService,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Sets i18n
      this.languageService.setInitialAppLanguage();

      // Set Sidebar Menus
      this.appPages = [
        {
          title: 'app.titles.home',
          url: '/home'
        },
        {
          title: 'app.titles.profile',
          url: '/profile'
        },
        {
          title: 'app.titles.guild',
          url: '/guild'
        },
        {
          title: 'app.titles.events',
          url: '/quests'
        }
      ];

      // Initializates app on the right page according to Auth
      this.authService.getAuthState().subscribe(state => {
        if (state == 1) {
          this.router.navigate(['home']);
          this.menuCtrl.enable(true);
        } else if (state == 2) {
          this.router.navigate(['']);
        }
      });

      // Block sidebar on login or redirect to typed route
      this.router.events.subscribe((event: RouterEvent) => {
        if (event instanceof NavigationEnd && (event.url === '/' || event.url === '')) {
          this.menuCtrl.enable(false);
        }
      });
    });
  }

  logout() {
    this.authService.logout();
  }
}
