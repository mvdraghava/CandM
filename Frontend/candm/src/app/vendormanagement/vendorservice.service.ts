import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { Vendor } from './vendor'

@Injectable({
  providedIn: 'root'
})
export class VendorserviceService {

  constructor(private http: HttpClient) { }

  private addvendorurl = environment.apiurl + 'addvendor';
  private getvendorsurl = environment.apiurl + 'getvendors';

  addvendor(data): Observable<any>{
    return this.http.post(this.addvendorurl, data);
  }

  getvendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.getvendorsurl);
  }

}
