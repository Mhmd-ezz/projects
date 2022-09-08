import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { SwUpdate } from '@angular/service-worker';

import { AuthService } from 'app/blocks/auth/auth.service';

import { Apollo } from 'apollo-angular';

import * as fromRoot from 'app/store/reducers';
import * as fromSelectors from 'app/store/selectors';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as fromTicketsActions from 'app/store/actions';
import { TicketEventGQL } from 'app/blocks/graphql/generated/gqlServices';

@Component({
    selector: 'shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
    tenant: any;
    constructor(
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _platform: Platform,
        private authService: AuthService,
        private swUpdate: SwUpdate,
        private apollo: Apollo,        
        private _ticketEventGQL:TicketEventGQL,       
        private _store: Store<fromRoot.AppState>

    ) {

        if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe((d) => {
                if (confirm('New version available. Load New Version?')) {
                    window.location.reload();
                }
            });
        }

        this.authService.runInitialLoginSequence();
    }

    /**
     * 
     * 
     * 
     * @memberOf ShellComponent
     */
    ngOnInit(): void {
        this._store.select(fromSelectors.getTenant)
    .pipe(filter(x => x != null))
    .subscribe(tenant => {
      this.tenant = tenant;
      this.apollo.subscribe({
        query: this._ticketEventGQL.document,
        variables: {
            tenantId: this.tenant.id,
            userId: this.tenant.currentUser.id  
        },
        /*
          accepts options like `errorPolicy` and `fetchPolicy`
        */
      }).subscribe((result) => {
        if (result) {

          
          const payload = result && result.data ? result.data : null;
          const user=this.tenant.currentUser.firstName+' '+this.tenant.currentUser.lastName;
          console.log('New comment:', payload);
          
          this._store.dispatch(fromTicketsActions.onEventTicket({ data:payload,user:user} ));
            

        }
      });
    });
    }


    /**
     * 
     * 
     * 
     * @memberOf ShellComponent
     */
    ngOnDestroy(): void {
    }


}
