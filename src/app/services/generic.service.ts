import { Injectable } from '@angular/core';
import { resources } from '../constants/resources';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';


@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(
    private _http: HttpClient,
    private _utilityService: UtilityService) { }

  loadMessagesApp(): Observable<any> {
    return this._http.get(resources.LOAD_MESSAGES + resources.EXT_JSON)
      .pipe(
        map(res => res),
        catchError(this._utilityService.handleErrorObservable("loadMessagesApp"))
      );
  }
}
