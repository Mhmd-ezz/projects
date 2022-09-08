import { Action, createReducer, on } from "@ngrx/store";
import * as appointmentsActions from '../actions/appointments.action';
import { AppointmentEventSubscription } from 'app/blocks/graphql/generated/gqlServices';

export class AppointmentsState {

    appointment: AppointmentEventSubscription["appointmentEvent"];
    eventAppointment: AppointmentEventSubscription["appointmentEvent"];
    error: any;
}

const initialState: AppointmentsState = {
    appointment: null,
    eventAppointment: null,
    error: null
};

const appointmentsReducer = createReducer(initialState,

    // -------------------------------------
    // @ READ LOOKUPS
    // -------------------------------------

    on(appointmentsActions.onAppointmentSuccess, (state: AppointmentsState, payload) => {
        // console.log('reducer', payload)
        return {
            ...state,
            appointment: payload.data,
            error: null
        };
    }),

    on(appointmentsActions.onEventAppointment, (state: AppointmentsState, payload) => {
        // console.log('reducer', payload)
        return {
            ...state,
            eventAppointment: payload.data,
            error: null
        };
    }),

    // on(drugssActions.DrugsFuzzySearchSuccess, (state: DrugsState, payload) => {
    //     console.log('redcuer Fuzzy',payload)
    //     return {
    //         ...state,
    //         drugsFuzzySearch:payload.drugs,
    //         error: null
    //     };
    // }),
);
export function reducer(
    state: AppointmentsState,
    action: Action
): AppointmentsState {
    return appointmentsReducer(state, action);
}

export const getAppointments = (state: AppointmentsState) => state.appointment;
export const getAppointmentEvent = (state: AppointmentsState) => state.eventAppointment;
    //export const getDrugsFuzzySearch = (state: DrugsState) => state.drugsFuzzySearch;