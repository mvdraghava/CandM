import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreatestServiceService {

  constructor(private http: HttpClient) { }

  private createsturl = environment.apiurl + 'createst';
  createst(data) {
    return this.http.post(this.createsturl, data);
  }
}
