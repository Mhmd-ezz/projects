import { onEventAppointmentSelector } from './../../store/selectors/appointments.selector';
import { AppointmentsEventCallbackService } from '../graphql/subscriptionsCallback/appointmentsEventCallback.service';
import { TenantsService } from './tenants.service';
import { Injectable } from '@angular/core';
import { filter, skip, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromSelectors from '@appStore/selectors';
import { AppState } from '@appStore/reducers';
import * as fromPatientsActions from '@appStore/actions';
import { AppointmentEventSubscription } from '../graphql/generated/gqlServices';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  tenantId: string;
  private _unsubscribeAll: Subject<any>;

  public onEventAppointment$: Observable<AppointmentEventSubscription["appointmentEvent"]>;

  constructor(
    // private _tenantsService: TenantsService,
    private _appointmentsEventCallbackService: AppointmentsEventCallbackService,
    private _store: Store<AppState>,

  ) {

    // this.tenantId = this._tenantsService.currentTenant$.value.id;
    this._unsubscribeAll = new Subject();
  }

  public init() {
    this.subscribeToAppointmentsEvents();
  }

  public unsubscribe() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private subscribeToAppointmentsEvents() {

    this._store.select(fromSelectors.getTenant)
      .pipe(filter(x => x != null))
      .subscribe(tenant => {
        this.tenantId = tenant.id;

        this._store.dispatch(fromPatientsActions.subscribeAppointment({
          variables: {
            tenantId: tenant.id,
            userId: tenant.currentUser.id
          }
        }));
      });


    this.onEventAppointment$ = this._store.select(onEventAppointmentSelector)
      .pipe(
        skip(1), // @ skip the first emit, which is emited by default using ngrx initial state 
        takeUntil(this._unsubscribeAll),
      );

    this.onEventAppointment$.subscribe(data => {
      this._appointmentsEventCallbackService.showPopup(data)
    })

  }
}
