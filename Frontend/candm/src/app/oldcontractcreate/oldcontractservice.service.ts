import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OldcontractserviceService {
  constructor(private http: HttpClient) { }

  private savetenderurl = environment.apiurl + 'savetender';
  savetender(data) {
    return this.http.post(this.savetenderurl, data);
  }
}
