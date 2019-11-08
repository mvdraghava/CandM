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
  private nextIndentUrl = 'http://127.0.0.1:8000/createbid/nextIndentNumber';
  private createotUrl = 'http://127.0.0.1:8000/createbid/createot'
  getNextIndentNumber() {
    return this.http.get<IndentNumber>(this.nextIndentUrl);
  }
  postcreateOt(datatosend): Observable<Blob> {
    return this.http.post(this.createotUrl, datatosend, {responseType: 'blob'});
  }
}
