import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, NavigationEnd, ActivatedRoute, CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as localforage from "localforage";
import { LocalDbInstances } from '../enum/local-db-instances.enum';
import { TenantsService } from '../services/tenants.service';
import { SpecialityEnum } from '../enum/speciality.enum';
import { Tenant } from '../common/tenant.model';
import { stat } from 'fs';
import { tap, map, mergeAll, filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromSelectors from '@appStore/selectors';
import { AppState } from '@appStore/reducers';


@Injectable()
export class SpecialityRedirectGuard implements CanActivate {

    to: string

    previousUrl: any;
    constructor(
        private _router: Router,
        private _tenantsService: TenantsService,
        private _store: Store<AppState>,

    ) {
        // @ Load tenant is important where where canActivate method is called before resolve in angular cycle
        // this._tenantsService.init$.subscribe()
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> {

        this.to = this.getNavigationSpeciality(state)

        // @ navigating to media, patient dashboard ...
        if (this.to == '') {
            return of(true)
            // @ user is routing to speciality 
        } else {

            let res = this.getTenantData(route)
            return res.pipe(
                map((data) => data)
            )
        }
    }

    // @ try to identify to which speciality want to navigate
    private getNavigationSpeciality(state) {

        let result = ''

        state.url.split("/").forEach((element, i) => {

            if (i > 1 && element === SpecialityEnum.general) {
                result = SpecialityEnum.general
            } else if (i > 1 && element === SpecialityEnum.cardiology) {
                result = SpecialityEnum.cardiology
            }

        });
        return result
    }

    private getTenantData = (route) =>
        new Observable<boolean>((observable) => {

            this._store.select(fromSelectors.getTenant)
                .pipe(
                    filter((tenant) => !!tenant)
                )
                // this._tenantsService.currentTenant$
                .subscribe((tenant: Tenant) => {

                    // if (tenant == null) return;
                    if (tenant) {

                        // @ user speciality match the navigating page
                        if (tenant?.speciality.key == this.to) {
                            observable.next(true)
                        }

                        // @ user  speciality doesn't match the navigating page 
                        else {

                            let patientId = route['params'].id

                            if (!patientId)
                                console.error(`[ERROR]: unable to naviagte to ${tenant.speciality.key}. Patient id is not found. `)

                            // @ redirect the user to valid patients according to his speciality
                            let specialityRoute = this.getUrlByspeciality(tenant.speciality.key)

                            this._router.navigate(['patients', patientId, specialityRoute])

                            observable.next(false)
                        }
                    }


                })
            // .catch((error) => {
            //     this.resolveTenantData(route)
            // })
        })



    // @ Match a speciality to get a router path name that match registered route in (patient-routing.module.ts)
    getUrlByspeciality(speciality) {
        let result = 'general'

        if (speciality == SpecialityEnum.cardiology)
            result = 'cardiology'

        return result

    }
}
