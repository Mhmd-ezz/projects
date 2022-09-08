import { IDashboard } from './../interface/dashboard.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Opportunity } from '../interface/opportunity.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private backendUrl: string = environment.backendUrl;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  get(from, to): Observable<IDashboard> {
    return this.httpClient.get<any>(`${this.backendUrl}/api/dashboard/get`, {
      params: new HttpParams()
        .set('to', to)
        .set('from', from)
    })
      .pipe(map((data: any) => data.data));
  }

  getToBeDelivered(from, to): Observable<Opportunity> {
    return this.httpClient.get<any>(`${this.backendUrl}/api/dashboard/to_be_delivered`, {
      params: new HttpParams()
        .set('to', to)
        .set('from', from)
    })
      .pipe(map((data: any) => data.data));
  }
  getDemos(to, from): Observable<Opportunity> {
    return this.httpClient.get<any>(`${this.backendUrl}/api/dashboard/demos`, {
      params: new HttpParams()
        .set('to', to)
        .set('from', from)
    })
      .pipe(map((data: any) => data.data));
  }
}
