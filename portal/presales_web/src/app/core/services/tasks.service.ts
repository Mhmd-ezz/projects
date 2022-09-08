/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-trailing-spaces */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPaginateInfo } from '../interface/IpaginatedInfo.interface';

// import { Task } from '../interface/task.interface';
import { Task } from '../../modules/admin/opportunities/tasks/tasks.types';

export interface TasksRequestParams {
  page: number;
  limit: number;
  filter: string;
  sortBy: string;
  descending: string | boolean;
  dueDateFrom: string;
  dueDateTo: string;
  created_by: string[] | null;
  assigned_to: string[] | null;
  opportunity_id: any[] | null;
  priority: string[];
  completed: string[];
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private backendUrl: string = environment.backendUrl;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getTasks(
    params: TasksRequestParams
  ): Observable<IPaginateInfo<Task>> {

    if (typeof params.descending == 'string' || !params.descending) {
      params.descending = params.descending === 'desc' ? true : false;
    }
    // console.log(releaseTo, releaseFrom);
    return this.httpClient.get<IPaginateInfo<Task>>(`${this.backendUrl}/api/tasks/list`, {

      // @ http params doesn't accept boolean
      // @ server should parse 
      params: new HttpParams()
        .set('page', params.page.toString())
        .set('limit', params.limit.toString())
        .set('filter', params.filter)
        .set('sortBy', params.sortBy)
        .set('descending', params.descending?.toString())

        .set('dueDate_from', params.dueDateFrom ? params.dueDateFrom?.toString() : '')
        .set('dueDate_to', params.dueDateTo ? params.dueDateTo?.toString() : '')

        .set('priority', params.priority ? params.priority?.toString() : '')
        .set('completed', params.completed ? params.completed?.toString() : '')
        .set('opportunity_id', params.opportunity_id ? params.opportunity_id.join(',') : '')

        .set('assigned_to', params.assigned_to ? params.assigned_to.join(',') : '')
        .set('created_by', params.created_by ? params.created_by.join(',') : '')

    });
  }

  createTask(task) {
    return this.httpClient.post<Task>(`${this.backendUrl}/api/tasks`, task);
    // .pipe(map((data: Opportunity) => data as ));
  }

  updateTask(task) {
    return this.httpClient.put<Task>(`${this.backendUrl}/api/tasks`, task);
      // .pipe(map((data: any) => data.data));
  }

  getTaskById(id) {
    return this.httpClient.get<Task>(`${this.backendUrl}/api/tasks/${id}`);
      // .pipe(map((data: any) => data.data));
  }

  deleteTask(id) {
    return this.httpClient.delete(`${this.backendUrl}/api/tasks/${id}`);
  }
}
