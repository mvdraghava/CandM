import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Bid } from '../bid-data-type';

@Injectable({
  providedIn: 'root'
})
export class GetopenbidsService {

  constructor(private http: HttpClient) { }

  private getbidurl = "http://127.0.0.1:8000/createbid/getopenbids";

  getopenbids(): Observable<Bid[]> {
    return this.http.get<Bid[]>(this.getbidurl);
  }
}
