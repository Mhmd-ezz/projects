
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class PatientsGqlService {

    constructor() {
    }

    // getPatients(): Observable<any[]> {
    //     return this.httpClient.get<any[]>(this.baseUrl + '/patients');
    // }

    // getPatientById(id): Observable<any[]> {
    //     return this.httpClient.get<any[]>(this.baseUrl + '/patients/' + id);
    // }

    // createPatient(data): Observable<any[]> {
    //     return this.httpClient.post<any[]>(this.baseUrl + '/patients', data);
    // }

    // updatePatient(id, data): Observable<void> {
    //     return this.httpClient.put<void>(this.baseUrl + '/patients/' + id, data);
    // }
}
