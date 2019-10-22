import { Component } from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from "./services/auth.service";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {LanguageService} from "./services/language.service";
import {User} from './models/User';

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
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#703C74');
      this.splashScreen.hide();

      // Sets i18n
      this.languageService.setInitialAppLanguage();

      // Initializates app on the right page according to Auth
      this.authService.getAuthState().subscribe(state => {
        if (state == 1) {
          this.router.navigate(['home']);

          // Set Sidebar Menus
          this.appPages = [];
          this.authService.getUserData().then((user: User) => {
            this.appPages =
                [
                  {
                    title: 'app.titles.home',
                    url: '/home'
                  },
                  {
                    title: 'app.titles.profile',
                    url: `/profile/${user.id}`
                  },
                  {
                    title: 'app.titles.guild',
                    url: `/guild/${user.guilds[0].id}`
                  },
                  {
                    title: 'app.titles.events',
                    url: '/quests'
                  }
                ];
          });

          // Enable Sidebar
          this.menuCtrl.enable(true);
        } else if (state == 2) {
          this.router.navigate(['']);
        }
      });

      // Block sidebar on login or redirect to typed route
      this.router.events.subscribe((event: RouterEvent) => {
        if (event instanceof NavigationEnd && (event.url === '/' || event.url === '')) {
          this.menuCtrl.enable(false);
        } else {
          this.menuCtrl.enable(true);
        }
      });
    });
  }

  logout() {
    this.authService.logout();
  }

  goAbout() {
    this.router.navigate(['about']);
  }
}
