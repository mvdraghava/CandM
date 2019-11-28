import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { Vendor } from './vendor'

import { Employee } from '../employee'

@Injectable({
  providedIn: 'root'
})
export class CreatelteserviceService {

  constructor(private http: HttpClient) { }

  private getemployeesurl = environment.apiurl + 'getemployees';
  private getvendorsurl = environment.apiurl + 'getvendors';

  getvendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.getvendorsurl);
  }

  getemployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.getemployeesurl);
  }


}
