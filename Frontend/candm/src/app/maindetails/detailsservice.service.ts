import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DetailsserviceService {

  filenames :string[] = [];

  constructor(private http: HttpClient) { }

  private getfilenamesurl = "http://127.0.0.1:8000/createbid/getfilenames";

  getfilenames(reqdata){
    return this.http.post(this.getfilenamesurl,reqdata);
  }
}
