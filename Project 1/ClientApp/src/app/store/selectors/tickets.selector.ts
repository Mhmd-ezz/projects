import { createSelector } from '@ngrx/store';
import * as fromTickets from '../reducers/tickets.reducer';
import { AppState } from '@appStore/reducers';

export const getTicketsState = (state: AppState) => state.tickets;

export const ticketsSelector = createSelector(getTicketsState, fromTickets.getTickets);
export const selectedTicketSelector = createSelector(getTicketsState, fromTickets.getSelectedTicket);

export const createTicketSelector = createSelector(getTicketsState, fromTickets.getCreatedTicket);
export const updateTicketSelector = createSelector(getTicketsState, fromTickets.getUpdatedTicket);
export const TicketError = createSelector(getTicketsState, fromTickets.getError);

export const TicketSavedLocallySelector = createSelector(getTicketsState, fromTickets.getTicketSavedLocally);



export const TicketMediaFiles = createSelector(getTicketsState, fromTickets.getTicketMediaFiles);


export const onEventTicketSelector = createSelector(getTicketsState, fromTickets.getTicketEvent);
