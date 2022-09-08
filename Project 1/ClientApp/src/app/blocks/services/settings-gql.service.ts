
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable()
export class SettingsGqlService {

    private baseUrl: string;

    /**
    * Constructor
    * @param {HttpClient} _httpClient
    */
    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.backEnd + '/graphql';
    }


    // ----------------------------------------------------------------------
    //  Lookups
    // ----------------------------------------------------------------------

    getLookups(): Observable<any[]> {
        return this.httpClient.get<any[]>(this.baseUrl + '/lookups');
    }

    getLookupById(id): Observable<any[]> {
        return this.httpClient.get<any[]>(this.baseUrl + '/lookups/' + id);
    }

    createLookup(data): Observable<any[]> {
        return this.httpClient.post<any[]>(this.baseUrl + '/lookups', data);
    }

    updateLookup(id, data): Observable<void> {
        return this.httpClient.put<void>(this.baseUrl + '/lookups/' + id, data);
    }



    // ----------------------------------------------------------------------
    //  Location
    // ---------------------------------------------------------------------


    getLocations(): Observable<any[]> {
        return this.httpClient.get<any[]>(this.baseUrl + '/locations');
    }

    getLocationById(id): Observable<any[]> {
        return this.httpClient.get<any[]>(this.baseUrl + '/locations/' + id);
    }

    createLocation(data): Observable<any[]> {
        return this.httpClient.post<any[]>(this.baseUrl + '/locations', data);
    }

    updateLocation(id, data): Observable<void> {
        return this.httpClient.put<void>(this.baseUrl + '/locations/' + id, data);
    }

    deleteLocation(id): Observable<void> {
        return this.httpClient.delete<void>(this.baseUrl + '/locations/' + id);
    }
}
