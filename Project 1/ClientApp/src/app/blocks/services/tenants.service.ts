import { LocalDbInstancesService } from './../common/local-db-instances.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { LocalDbInstances } from 'app/blocks/enum/local-db-instances.enum';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, empty, BehaviorSubject, timer, throwError, EMPTY, of } from 'rxjs';
import { map, tap, catchError, takeWhile, delay, repeatWhen, retryWhen, delayWhen, share, shareReplay, retry, take, mergeAll } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Tenant } from '../common/tenant.model';
import * as localforage from "localforage";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalDbStorenameInstanceEnum } from '../enum/local-db-storename-instance.enum';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { LoadCurrentTenant, LoadCurrentTenantLocally } from '@appStore/actions';
import * as fromSelectors from '../../store/selectors';


var tenantStore = localforage.createInstance({
    name: LocalDbInstances.Medcilia,
    storeName: LocalDbStorenameInstanceEnum.tenant,
    driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
});

@Injectable({
    providedIn: 'root'
})
export class TenantsService {

    private baseUrl: string;
    private tenantsBaseUrl: string;
    public currentTenant$: BehaviorSubject<Tenant> = new BehaviorSubject<Tenant>(null as Tenant);
    public tenantStore = tenantStore;
    public init$
    tenant: Tenant;

    /**
    * Constructor
    * @param {HttpClient} _httpClient
    */
    constructor(
        private httpClient: HttpClient,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private ngxService: NgxUiLoaderService,
        private _snackBar: MatSnackBar,
        private _store: Store<fromRoot.AppState>,

    ) {

        this.baseUrl = environment.backEnd;
        this.tenantsBaseUrl = this.baseUrl + '/api/tenants';
        // this.loaderProcessor();

        // @ Create shared inctance to avoid multi requests to server
        // this.init$ = of(this.loadTenant(), this.getLocal())
        //     .pipe(
        //         mergeAll(),
        //         shareReplay(1),
        //     )
    }

    onAppInit() {
      this._store.select(fromSelectors.getTenant).pipe(
            tap((tenant) => {
                this.tenant=tenant;
                console.log('GetTenant in tenant service',tenant)
                if(this.tenant === null)
                {
                    console.log('tenant null, loading current tenant ....')
                    this._store.dispatch(new LoadCurrentTenant())
                }
            }),
            take(3),
            // tap(t => this.loadProcessor(t)),
        ).toPromise()
    }

    getLocal() {
        return new Observable<Tenant>((observable) => {
            tenantStore.getItem('type')
                .then(
                    (tenant: Tenant) => {
                        observable.next(tenant)
                    }).catch((error) => {
                        observable.error(error)
                    })
        });
    }

    loadTenant() {
        let snackRef = this._snackBar;

        return this.httpClient
            .get<Tenant>(this.tenantsBaseUrl + '/tenant')
            .pipe(
                retryWhen(errors =>
                    errors.pipe(
                        tap(() => {
                            if (!snackRef._openedSnackBarRef) {
                                snackRef.open("Please, check your internet connection.",
                                    'Ok',
                                    { panelClass: "settings_load_snackbar_error" });
                            }
                        }),
                        // Retry just 3 times
                        take(3),
                        //restart in 10 seconds
                        delayWhen(() => timer(10000))
                    )
                ),
                catchError((error) => {
                    return EMPTY;
                }),
                shareReplay(),
                tap((data) => {
                    // this.currentTenant$.next(data);
                    // this.setTenant(data);
                    this._snackBar.dismiss()
                })
            )
    }

    // @ Depricated
    getTenant(): Observable<Tenant> {
        return this.httpClient
            .get<Tenant>(this.tenantsBaseUrl + '/tenant');
    }

    setTenant(tenant) {
        tenantStore
            .setItem('type', tenant)
            .catch(error => {
                console.error(['[ERROR]: Unable to store tenant.', error])
            })
    }

    clearTenantLocally() {
        tenantStore
            .removeItem('type')
            .catch(error => {
                console.error(['[ERROR]: Unable to remove tenant from local DB.', error])
            })
    }

    // getTenantLocally = () =>
    //     tenantStore.getItem('type')
    //         .then(
    //             (tenant: Tenant) => {
    //                 this.currentTenant$.next(tenant)
    //             }).catch((error) => {
    //             })

    // private loaderProcessor() {
    //     this.currentTenant$.subscribe(tenant => {
    //         // console.log('CURRENT TENANT LOADED +++++', tenant)
    //         if (tenant && tenant.id) {
    //             this.ngxService.stopLoader('app-loading-tenant');
    //         } else {
    //             this.ngxService.startLoader('app-loading-tenant');
    //         }
    //     })
    // }

    public showSnackbarError() {
        const snackRef = this._snackBar;

        this.getLocal().subscribe(t => {
            if (!snackRef._openedSnackBarRef && !t) {
                snackRef.open("Please, check your internet connection and reload the page.",
                    'Ok',
                    { panelClass: "settings_load_snackbar_error" });
            }
        })
    }

    public loadProcessor(tenant: Tenant) {
        tenant && tenant.id ? this.ngxService.stopLoader('app-loading-tenant') : this.ngxService.startLoader('app-loading-tenant')
    }
}
