import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {IonicStorageModule} from '@ionic/storage';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {UserModule} from './components/user/user.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AngularCropperjsModule } from 'angular-cropperjs';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {File} from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import {NgxSpinnerModule} from 'ngx-spinner';
import {interceptorProvider} from './interceptors/interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TeximateModule} from 'ngx-teximate';
import {GoogleMaps} from '@ionic-native/google-maps';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {IonicHeaderParallaxModule} from 'ionic-header-parallax';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicStorageModule.forRoot(),
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        UserModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        AngularCropperjsModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
        TeximateModule,
        IonicHeaderParallaxModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        AuthService,
        AuthGuardService,
        interceptorProvider,
        BarcodeScanner,
        Camera,
        File,
        WebView,
        FilePath,
        GoogleMaps,
        ScreenOrientation
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
