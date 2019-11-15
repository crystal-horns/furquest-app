import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private subject = new Subject();
  private loadingStack = [];
  constructor() { }

  push($key) {
    this.loadingStack.push($key);
    this.subject.next(this.loadingStack);
  }

  pop($key) {
    if (typeof $key !== 'undefined') {
      const index = this.loadingStack.indexOf($key);

      if (index > -1) {
        this.loadingStack.splice(index, 1);
      } else {
        this.loadingStack.pop();
      }
    } else {
      this.loadingStack.pop();
    }
    this.subject.next(this.loadingStack);
  }

  get(): Observable<any> {
    return this.subject.asObservable();
  }
}
