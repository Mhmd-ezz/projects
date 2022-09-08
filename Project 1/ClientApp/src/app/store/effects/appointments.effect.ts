import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { subscriptionEventEnum } from "app/blocks/enum/subscription-events.enum";
import { AppointmentEventGQL } from "app/blocks/graphql/generated/gqlServices";
import { map, switchMap } from "rxjs/operators";
import * as fromAppointmentsActions from '../actions/appointments.action';

@Injectable()
export class AppointmentsEffects {
    constructor(
        private actions$: Actions,
        private _appointmentEventGQL: AppointmentEventGQL,
    ) {
    }

    @Effect()
    subscribeApointments$ = this.actions$.pipe(
        ofType(fromAppointmentsActions.subscribeAppointment),
        switchMap((data) => this._appointmentEventGQL.subscribe({
            tenantId: data.variables.tenantId,
            userId: data.variables.userId
        })
        ),
        map(({ data, errors }) => {

            console.log('effects ==>', data)

            const payload = data && data.appointmentEvent ? data.appointmentEvent : null;
            // if (data.appointmentEvent?.event == subscriptionEventEnum.appointment_created)
                return fromAppointmentsActions.onEventAppointment({ data: payload });

            // else if (data.appointmentEvent?.event == subscriptionEventEnum.appointment_updated)
            //     return fromAppointmentsActions.onEventAppointment({ data: payload });
            // else if (data.appointmentEvent?.event == subscriptionEventEnum.appointment_updated)

        })
    );
}

