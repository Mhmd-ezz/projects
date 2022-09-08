import { createSelector } from '@ngrx/store';
import * as fromAppointments from '../reducers/appointments.reducer';
import { AppState } from '@appStore/reducers';

export const getAppointmentsState = (state: AppState) => state.appointments;

// export const onAppointmentCreatedSelector = createSelector(getAppointmentsState, fromAppointments.getAppointments);
export const onEventAppointmentSelector = createSelector(getAppointmentsState, fromAppointments.getAppointmentEvent);
