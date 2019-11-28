import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DetailsserviceService {

  public biddetails;
  filenames :string[] = [];

  constructor(private http: HttpClient) { }

  private getfilenamesurl = "http://127.0.0.1:8000/createbid/getfilenames";
  private getbiddetailsurl = environment.apiurl + 'getbiddetails';
  private prepareQRurl = environment.apiurl + 'prepareqr';
  private editQRurl = environment.apiurl + 'editqr';
  private getotNITurl = environment.apiurl + 'getotNIT';

  getfilenames(reqdata){
    return this.http.post(this.getfilenamesurl,reqdata);
  }

  getbiddetails(data) : Observable<any>{
    return this.http.post(this.getbiddetailsurl,data);
  }

  prepareqr(data) : Observable<Blob> {
    return this.http.post(this.prepareQRurl,data,{responseType: 'blob'});
  }

  editqr(data) : Observable<any>{
    return this.http.post(this.editQRurl,data);
  }

  getotNIT(data): Observable<Blob> {
    return this.http.post(this.getotNITurl,data,{responseType: 'blob'});
  }

}
