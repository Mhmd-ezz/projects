import { Branch } from './../interface/branch.interface';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-trailing-spaces */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPaginateInfo } from '../interface/IpaginatedInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  private backendUrl: string = environment.backendUrl;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getBranches(
    page: number = 0,
    limit: number = 10,
    filter: string = '',
    sortBy: string = 'name',
    descending: string | boolean = false,
  ): Observable<IPaginateInfo<Branch>> {

    if (typeof descending == 'string' || !descending) {
      descending = descending === 'desc' ? true : false;
    }
    // console.log(releaseTo, releaseFrom);
    return this.httpClient.get<IPaginateInfo<Branch>>(`${this.backendUrl}/api/branches/list`, {

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

  createBranch(branch) {
    return this.httpClient.post<Branch>(`${this.backendUrl}/api/branches`, branch);
    // .pipe(map((data: Opportunity) => data as ));
  }

  updateBranch(branch) {
    return this.httpClient.put<Branch>(`${this.backendUrl}/api/branches/${branch.id}`, branch)
      .pipe(map((data: any) => data.data));
  }

  getBranchById(id) {
    return this.httpClient.get<Branch>(`${this.backendUrl}/api/branches/${id}`)
      .pipe(map((data: any) => data.data));
  }

  deleteBranch(id) {
    return this.httpClient.delete(`${this.backendUrl}/api/branches/${id}`);
  }
}
