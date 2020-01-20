import {Component, ViewChild} from '@angular/core';

import {IonRouterOutlet, MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from "./services/auth.service";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {LanguageService} from "./services/language.service";
import {User} from './models/User';
import {LoadingService} from './services/loading.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages;
  @ViewChild(IonRouterOutlet, {static: false}) routerOutlet: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService,
    private languageService: LanguageService,
    private menuCtrl: MenuController,
    private loadingService: LoadingService,
    private spinner: NgxSpinnerService,
    private screenOrientation: ScreenOrientation
  ) {
    this.initializeApp();

    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      }
    });
  }

  initializeApp() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.loadingService.push('loading_app');
    this.loadingService.get().subscribe(async (stack) => {
      if (stack.length === 0) {
        await this.spinner.hide('generalLoading');
      } else {
        await this.spinner.show('generalLoading');
      }
    });

    this.platform.ready().then(() => {
      this.loadingService.pop('loading_app');
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
