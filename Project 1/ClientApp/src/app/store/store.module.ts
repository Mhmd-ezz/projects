import { NgModule } from '@angular/core';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
    RouterStateSerializer,
    StoreRouterConnectingModule, DefaultRouterStateSerializer
} from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import { reducers, effects, CustomSerializer } from 'app/store';

export const metaReducers: MetaReducer<any>[] = environment.production
    ? []
    : [storeFreeze];

@NgModule({
    imports: [
        StoreModule.forRoot(reducers,
            {
                metaReducers,
                // @ Disable ngrx from assigning immutable objects
                runtimeChecks: {
                    strictStateImmutability: false,
                    strictActionImmutability: false,
                }
            }),
        EffectsModule.forRoot(effects),
        environment.production ? [] : StoreDevtoolsModule.instrument(),
        StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer })
    ],
    providers: [
        {
            provide: RouterStateSerializer,
            useClass: CustomSerializer
        }
    ]
})
export class AppStoreModule { }
