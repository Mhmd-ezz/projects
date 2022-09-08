import { Injectable } from '@angular/core';
import { LocalDbInstances } from 'app/blocks/enum/local-db-instances.enum';
// import { TenantsService } from 'app/blocks/services/tenants.service';
import localforage from 'localforage';
import { LocalDbStorenameInstanceEnum } from './../enum/local-db-storename-instance.enum';
import { Store } from '@ngrx/store';
import * as fromSelectors from '@appStore/selectors';
import { AppState } from '@appStore/reducers';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocalDbInstancesService {

  constructor(
    // private _tenantsService: TenantsService,
    private _store: Store<AppState>,
  ) {
  }

  // private getTenantId() {
  //   // return this._tenantsService.currentTenant$;
  // }

  public getAppontmentSettingsInstance(): Observable<LocalForage> {
    return this._store.select(fromSelectors.getTenant)
      .pipe(
        map((tenant) => {
          return localforage.createInstance({
            name: `${LocalDbInstances.MedciliaData}-${tenant.id}`,
            storeName: `${LocalDbStorenameInstanceEnum.appointmentsSettings}`,
            driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
          });
        },
        ));

  }

  public getTenantInstance(): Observable<LocalForage> {

    return this._store.select(fromSelectors.getTenant)
      .pipe(
        map((tenant => {
          return localforage.createInstance({
            name: `${LocalDbInstances.MedciliaData}-${tenant.id}`,
            storeName: `${LocalDbStorenameInstanceEnum.tenant}`,
            driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
          });
        })
        ));
  }

  public getPatientsSettingsInstance(): Observable<LocalForage> {
    return this._store.select(fromSelectors.getTenant).pipe(
      map(
        tenant => {
          return localforage.createInstance({
            name: `${LocalDbInstances.MedciliaData}-${tenant?.id}`,
            storeName: `${LocalDbStorenameInstanceEnum.patientsSettings}`,
            driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
          });
        }));
  }

  public getGqlOfflineInstance(): Observable<LocalForage> {
    return this._store.select(fromSelectors.getTenant).pipe(
      map(tenant => {
        return localforage.createInstance({
          name: `${LocalDbInstances.MedciliaData}-${tenant.id}`,
          storeName: 'Offline',
          driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
        });
      }));
  }

  public getGQLCachePersistorInstance(): Observable<LocalForage> {
    return this._store.select(fromSelectors.getTenant).pipe(

      map(tenant => {
        return localforage.createInstance({
          name: `${LocalDbInstances.MedciliaData}-${tenant.id}`,
          storeName: 'apollo-cache-persist',
          driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
        });
      }));
  }
}
