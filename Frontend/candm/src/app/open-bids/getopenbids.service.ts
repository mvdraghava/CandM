import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';

import { Bid } from '../bid-data-type';

@Injectable({
  providedIn: 'root'
})
export class GetopenbidsService {

  constructor(private http: HttpClient) { }

  private getbidurl = environment.apiurl + "getopenbids";

  getopenbids(): Observable<Bid[]> {
    return this.http.get<Bid[]>(this.getbidurl);
  }
}
