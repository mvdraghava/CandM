import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';



export interface IndentNumber {
  indentnumber: number;
}

@Injectable({
  providedIn: 'root'
})
export class CreateTenderService {
  constructor(private http: HttpClient) { }
  private nextIndentUrl = 'http://192.168.57.52:521/createbid/nextIndentNumber';
  private createotUrl = 'http://192.168.57.52:521/createbid/createot'
  getNextIndentNumber() {
    return this.http.get<IndentNumber>(this.nextIndentUrl);
  }
  postcreateOt(datatosend): Observable<Blob> {
    return this.http.post(this.createotUrl, datatosend, {responseType: 'blob'});
  }
}
