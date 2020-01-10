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
  private getltemNITurl = environment.apiurl + 'getltemNIT';
  private editcommitteeurl = environment.apiurl + 'editcommittee';
  private issuelteNITurl = environment.apiurl + 'issuelteNIT';
  private issuedateCorrigendumurl = environment.apiurl + 'datecorrigendum';
  private prepareltetecurl = environment.apiurl + 'prepareltetec';
  private loapovettingurl = environment.apiurl + 'loapovetting';
  private getlteeprocNITurl = environment.apiurl + 'getlteeprocNIT';

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

  editcommittee(data) : Observable<any> {
    return this.http.post(this.editcommitteeurl,data);
  }

  issuelteNIT(data) : Observable<any> {
    return this.http.post(this.issuelteNITurl,data);
  }

  getotNIT(data): Observable<Blob> {
    return this.http.post(this.getotNITurl,data,{responseType: 'blob'});
  }

  getltemNIT(data): Observable<Blob> {
    return this.http.post(this.getltemNITurl,data,{responseType: 'blob'})
  }

  getlteeprocNIT(data): Observable<Blob> {
    return this.http.post(this.getlteeprocNITurl,data,{responseType: 'blob'})
  }

  issuedateCorrigendum(data) : Observable<any> {
    return this.http.post(this.issuedateCorrigendumurl,data);
  }

  prepareltetec(data) : Observable<any> {
    return this.http.post(this.prepareltetecurl,data);
  }

  prepareloapovetting(reqdata) : Observable<any> {
    return this.http.post(this.loapovettingurl,reqdata);
  }

}
