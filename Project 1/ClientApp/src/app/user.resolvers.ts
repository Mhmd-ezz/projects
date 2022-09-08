// import { TenantsService } from 'app/blocks/services/tenants.service';
// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
// import { merge, Observable, of, scheduled } from 'rxjs';
// import { Tenant } from './blocks/models/tenant.model';
// import { map, mergeAll, take } from 'rxjs/operators';
// import { Store } from '@ngrx/store';
// import * as fromRoot from './store/reducers';
// import { LoadCurrentTenantLocally } from './store/actions/tenant.action';
// import * as fromSelectors from './store/selectors';

// @Injectable({
//     providedIn: 'root'
// })
// export class UserResolver implements Resolve<any>
// {
//     /**
//      * Constructor
//      */
//     constructor(
//         private _tenantService: TenantsService,
//         private _store: Store<fromRoot.AppState>,
//     ) {
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Public methods
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * Resolver
//      *
//      * @param route
//      * @param state
//      */
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tenant> {
//         return this._tenantService.init$.pipe(
//           take(1)
//         )
//     }
// }