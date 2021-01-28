import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class CreatesqserviceService {

  constructor(private http: HttpClient) { }

  private getemployeesurl = environment.apiurl + 'getemployees';
  private createsqurl = environment.apiurl + 'createsq';

  getemployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.getemployeesurl);
  }

  createsq(data) {
    return this.http.post(this.createsqurl, data);
  }
}
