import { TenantsService } from 'app/blocks/services/tenants.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as tenantActions from '../actions/tenant.action';
import { switchMap, map, catchError, tap, delay } from 'rxjs/operators';

import { SetCurrentTenant, SetCurrentTenantFailed } from '../actions/tenant.action';
import { Tenant } from 'app/blocks/common/tenant.model';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalDbInstances } from 'app/blocks/enum/local-db-instances.enum';
import { LocalDbStorenameInstanceEnum } from 'app/blocks/enum/local-db-storename-instance.enum';
import localforage from 'localforage';
import { EMPTY } from 'rxjs';


var tenantStore = localforage.createInstance({
    name: LocalDbInstances.Medcilia,
    storeName: LocalDbStorenameInstanceEnum.tenant,
    driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
});

@Injectable()
export class TenantEffects {
    constructor(private actions$: Actions, private httpClient: HttpClient, private tenantService: TenantsService) { }

    @Effect()
    loadCurrentTenantLocally$ = this.actions$.pipe(
        ofType(tenantActions.TenantActionTypes.LoadCurrentTenant),
        switchMap(x => {
            return this.tenantService.getLocal()
        }),
        // catchError(err => {
        //     console.error(err);
        //     return EMPTY;
        // }),
        map((tenant: Tenant) => {
            console.log('LoadCurrentTenant',tenant)
            
            if(tenant !==null)
            return new SetCurrentTenant(tenant);
            else
            return new SetCurrentTenantFailed(tenant);

        })
    );

    // @Effect()
    // loadCurrentlocalTenant$ = this.actions$.pipe(
    //     ofType(tenantActions.TenantActionTypes.LoadRemoteTenant),
    //     switchMap(x => {
    //         return this.tenantService.getLocal()
    //     }),
    //     // catchError(err => {
    //     //     console.error(err);
    //     //     return EMPTY;
    //     // }),
    //     map((tenant: Tenant) => {
    //         console.log('LoadRemoteTenant local ',tenant)
    //         if(tenant !==null)
    //         return new SetCurrentTenant(tenant);
    //         else
    //         return new tenantActions.SetCurrentTenanFailed(tenant);


    //     })
    // );

    @Effect()
    loadCurrentTenant$ = this.actions$.pipe(
        ofType(tenantActions.TenantActionTypes.LoadRemoteTenant),
        switchMap(x => {
            const url = environment.backEnd + '/api/tenants/tenant';
            return this.httpClient.get<Tenant>(url);
        }),
        // catchError( err => {
        //     this.tenantService.showSnackbarError();
        //     return null;
        // }),
        tap((tenant) => this.tenantService.setTenant(tenant)),
        // tap((tenant) => this.tenantService.loadProcessor(tenant)),
        map((tenant: Tenant) => {
            console.log('remote',tenant)
            return new SetCurrentTenant(tenant);
        })
    );

    @Effect()
    loadTenant$ = this.actions$.pipe(
        ofType(tenantActions.TenantActionTypes.LoadTenant),
        map((action: tenantActions.LoadTenant) => action.payload),
        switchMap(tenantId => {
            const url = environment.backEnd + '/api/tenants/';
            return this.httpClient.get<Tenant>(url + tenantId);
        }),
        // catchError(err => {
        //     console.error(err);
        //     return null;
        // }),
        map((tenant: Tenant) => {
            return new SetCurrentTenant(tenant);
        })
    );
}
