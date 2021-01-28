import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { environment } from '../environments/environment';

import { Employee } from './employee';
import { Vendor } from './vendor';

export interface IndentNumber {
  indentnumber: number;
}

@Injectable({
  providedIn: 'root'
})
export class CreateTenderService {
  constructor(private http: HttpClient) { }
  private nextIndentUrl = 'http://192.168.57.52:8000/createbid/nextIndentNumber';
  private createotUrl = 'http://192.168.57.52:8000/createbid/createot'
  private getemployeesurl = environment.apiurl + 'getemployees';
  private getvendorsurl = environment.apiurl + 'getvendors';

  getNextIndentNumber() {
    return this.http.get<IndentNumber>(this.nextIndentUrl);
  }
  postcreateOt(datatosend): Observable<Blob> {
    return this.http.post(this.createotUrl, datatosend, {responseType: 'blob'});
  }

  getemployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.getemployeesurl);
  }

  getvendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.getvendorsurl);
  }
}
