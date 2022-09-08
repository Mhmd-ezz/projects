/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-trailing-spaces */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Opportunity } from '../interface/opportunity.interface';
import { IPaginateInfo } from '../interface/IpaginatedInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class OpportunitiesService {
  private backendUrl: string = environment.backendUrl;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getOpportunities(
    page: number = 0,
    limit: number = 10,
    filter: string = '',
    sortBy: string = 'description',
    descending: string | boolean = false,
    releaseFrom: string = '',
    releaseTo: string = '',
    submissionFrom: string = '',
    submissionTo: string = '',
    userId: string[] = null,
    assignee: string[] = null,
    notAssignedFilter: number | boolean = 0,
    branchId: string[] = null,
    status: string[] = null,
    rfp_status: string[] = null,
    category: string[] = null,

  ): Observable<IPaginateInfo<Opportunity>> {

    if (typeof descending == 'string' || !descending) {
      descending = descending === 'desc' ? true : false;
    }

    // console.log(releaseTo, releaseFrom);
    return this.httpClient.get<IPaginateInfo<Opportunity>>(`${this.backendUrl}/api/opportunities/list`, {

      // @ http params doesn't accept boolean
      // @ server should parse 
      params: new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString())
        .set('filter', filter)
        .set('sortBy', sortBy)
        .set('descending', descending.toString())
        .set('release_from', releaseFrom)
        .set('release_to', releaseTo)
        .set('submission_from', submissionFrom)
        .set('submission_to', submissionTo)
        .set('user_id', userId ? userId.join(',') : '')
        .set('tasks_users', assignee ? assignee.join(',') : '')
        .set('notAssignedFilter', notAssignedFilter)
        .set('branch_id', branchId ? branchId.join(',') : '')
        .set('status', status ? status.join(',') : '')
        .set('rfp_status', rfp_status ? rfp_status.join(',') : '')
        .set('category', category ? category.join(',') : '')

    });
  }

  createOpportunity(opportunity) {
    return this.httpClient.post<Opportunity>(`${this.backendUrl}/api/opportunities`, opportunity);
    // .pipe(map((data: Opportunity) => data as ));
  }

  updateOpportunity(opportunity) {
    return this.httpClient.put<Opportunity>(`${this.backendUrl}/api/opportunities/${opportunity.id}`, opportunity);
    // .pipe(map((data: any) => data.data));
  }

  manageOpportunity(opportunity) {
    return this.httpClient.put<Opportunity>(`${this.backendUrl}/api/opportunities/manage/${opportunity.id}`, opportunity);
    // .pipe(map((data: any) => data.data));
  }

  notifyUploadedFiles(files: any[],id) {
    return this.httpClient.post<Opportunity>(`${this.backendUrl}/api/opportunities/notify_uploaded_files/${id}`, files);
  }

  getOpportunityById(id) {
    return this.httpClient.get<Opportunity>(`${this.backendUrl}/api/opportunities/${id}`);
    // .pipe(map((data: any) => data.data));
  }

  deleteOpportunity(id) {
    return this.httpClient.delete(`${this.backendUrl}/api/opportunities/${id}`);
  }
  downloadFile(id) {
    return this.httpClient.get<Blob>(`${this.backendUrl}/api/opportunities/download_file/${id}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  deleteFile(id) {
    return this.httpClient.delete(`${this.backendUrl}/api/opportunities/delete_file/${id}`);
  }
  publish(id, email_addresses) {
    return this.httpClient.post(`${this.backendUrl}/api/opportunities/publish/${id}`, email_addresses);
  }

  downloadReport(
    page: number = 0,
    limit: number = 10,
    filter: string = '',
    sortBy: string = 'description',
    descending: string | boolean = false,

    releaseFrom: string = '',
    releaseTo: string = '',
    submissionFrom: string = '',
    submissionTo: string = '',
    userId: string[] = null,
    assignee: string[] = null,
    notAssignedFilter: number | boolean = 0,
    branchId: string[] = null,
    status: string[] = null,
    rfp_status: string[] = null,
    category: string[] = null,

  ): Observable<any> {

    if (typeof descending == 'string' || !descending) {
      descending = descending === 'desc' ? true : false;
    }

    return this.httpClient.get<any>(`${this.backendUrl}/api/opportunities/download_report`, {
      // observe:'response',
      // responseType: 'text' as any,
      responseType: 'text' as any,
      // @ http params doesn't accept boolean
      // @ server should parse 
      params: new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString())
        .set('filter', filter)
        .set('sortBy', sortBy)
        .set('descending', descending.toString())
        .set('release_from', releaseFrom)
        .set('release_to', releaseTo)
        .set('submission_from', submissionFrom)
        .set('submission_to', submissionTo)
        .set('user_id', userId ? userId.join(',') : '')
        .set('tasks_users', assignee ? assignee.join(',') : '')
        .set('notAssignedFilter', notAssignedFilter)
        .set('branch_id', branchId ? branchId.join(',') : '')
        .set('status', status ? status.join(',') : '')
        .set('rfp_status', rfp_status ? rfp_status.join(',') : '')
        .set('category', category ? category.join(',') : '')

    });
  }

}
