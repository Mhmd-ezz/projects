/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-trailing-spaces */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../interface/client.interface';
import { IPaginateInfo } from '../interface/IpaginatedInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private backendUrl: string = environment.backendUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getClients(
    page: number,
    limit?: number,
    filter?: string,
    sortBy?: string,
    descending: string | boolean = false,

  ): Observable<IPaginateInfo<Client>> {

    if (typeof descending == 'string' || !descending) {
      descending = descending === 'desc' ? true : false;
    }

    return this.httpClient.get<IPaginateInfo<Client>>(`${this.backendUrl}/api/clients/list`, {

      // @ http params doesn't accept boolean
      // @ server should parse 
      params: new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString())
        .set('filter', filter)
        .set('sortBy', sortBy)
        .set('descending', descending.toString())
    });
  }

  createClient(client) {
    return this.httpClient.post<Client>(`${this.backendUrl}/api/clients`, client)
      .pipe(map((data: any) => data.data));
  }

  updateClient(client) {
    return this.httpClient.put<Client>(`${this.backendUrl}/api/clients/${client.id}`, client)
      .pipe(map((data: any) => data.data));
  }

  getClientById(id) {
    return this.httpClient.get<Client>(`${this.backendUrl}/api/clients/${id}`)
      .pipe(map((data: any) => data.data));
  }

  deleteClient(id) {
    return this.httpClient.delete(`${this.backendUrl}/api/clients/${id}`);
  }
}
