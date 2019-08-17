import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {fromPromise} from "rxjs/internal-compatibility";
import {mergeMap} from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return fromPromise(this.authService.getAuthToken()).pipe(
            mergeMap(token => {
                if (token) {
                    request = request.clone({
                        setHeaders: {
                            'Authorization': `Bearer ${token.access_token}`
                        }
                    });
                }

                return next.handle(request);
            }));
    }
}