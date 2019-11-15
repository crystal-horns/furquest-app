import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from "rxjs";
import {Storage} from "@ionic/storage";
import {fromPromise} from "rxjs/internal-compatibility";
import {delay, finalize, mergeMap} from 'rxjs/operators';
import {LoadingService} from '../services/loading.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        public storage: Storage,
        private loadingService: LoadingService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = request.url.split('api');
        this.loadingService.push(url[1]);

        return fromPromise(this.storage.get('USER_DATA')).pipe(
            mergeMap(token => {
                if (token) {
                    request = request.clone({
                        setHeaders: {
                            'Authorization': `Bearer ${token.access_token}`
                        }
                    });
                }

                return next.handle(request).pipe(
                    finalize(() => this.loadingService.pop(url[1]))
                );
            }));
    }
}
