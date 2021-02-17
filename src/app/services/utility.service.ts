import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public handleErrorObservable<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return throwError(result as T);
    };
  }

  numberRandon(): number {
    return Math.round(Math.random() * (10 - 1) + 1);
  }

  processRandon(): boolean {
    return (this.numberRandon() % 2 === 0);
  }
}
