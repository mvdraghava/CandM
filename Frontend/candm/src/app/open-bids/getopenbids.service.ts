import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Bid } from '../bid-data-type';

@Injectable({
  providedIn: 'root'
})
export class GetopenbidsService {

  constructor(private http: HttpClient) { }

  private getbidurl = "http://192.168.57.52:521/createbid/getopenbids";

  getopenbids(): Observable<Bid[]> {
    return this.http.get<Bid[]>(this.getbidurl);
  }
}
