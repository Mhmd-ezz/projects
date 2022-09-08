import { createAction, props } from "@ngrx/store";
import { AppointmentEventSubscriptionVariables, AppointmentEventSubscription } from "app/blocks/graphql/generated/gqlServices";


// @ Subscriptions
export const subscribeAppointment = createAction('[Subscribtions] subscribe Appointments', props<{ variables: AppointmentEventSubscriptionVariables }>());
export const onAppointmentSuccess = createAction('[Subscribtions] On Appointments Success', props<{ data: AppointmentEventSubscription['appointmentEvent'] }>());
export const onEventAppointment = createAction('[Subscribtions] Appointment Event', props<{ data: AppointmentEventSubscription['appointmentEvent'] }>());

