import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CreateTicketGQL, TicketEventGQL, TicketGQL, TicketInput, TicketMediaFilesGQL, TicketsGQL, UpdateTicketGQL } from 'app/blocks/graphql/generated/gqlServices';
import { map, switchMap, tap } from 'rxjs/operators';

import * as fromTicketsActions from '../actions';

@Injectable()
export class TicketsEffects {
    constructor(
        private actions$: Actions,      
        private  _ticketsGQL: TicketsGQL,
        private  _ticketGQL: TicketGQL,
        private  _updateTicketGQL: UpdateTicketGQL,
        private  _createTicketGQL: CreateTicketGQL,
        private _ticketMediaFilesGQL:TicketMediaFilesGQL,
        private _ticketEventGQL:TicketEventGQL
        
    ) { }

    @Effect()
    loadTickets$ = this.actions$.pipe(
        ofType(fromTicketsActions.loadTickets),
        switchMap((data) => this._ticketsGQL.watch({...data.variables}).valueChanges),
        map(({ data, errors, loading }) => {
            const tickets = data && data.tickets.items ? data.tickets.items : [];
            const ticketsTotal= data && data.tickets.count ? data.tickets.count : 0;
            if (errors) {
                return fromTicketsActions.loadTicketsFailure({ error: errors });
            }

            if (loading) {
                return fromTicketsActions.loadTicketsSuccess({ tickets:tickets, fromServer: false,ticketsTotal:ticketsTotal });
            }
            else {
                return fromTicketsActions.loadTicketsSuccess({ tickets:tickets, fromServer: true ,ticketsTotal:ticketsTotal});
            }
        })
    );

  
    @Effect()
    loadTicket$ = this.actions$.pipe(
        ofType(fromTicketsActions.loadTicket),
        switchMap((data) => this._ticketGQL.watch({ id: data.ticketId }).valueChanges),
        map(({ data, errors, loading }) => {
            const ticket = data && data.ticket ? data.ticket : null;
          
            if (errors) {
                return fromTicketsActions.loadTicketFailure({ error: errors });
            }

            if (loading) {
                return fromTicketsActions.loadTicketSuccess({ ticket, fromServer: false });
            }
            else {
                return fromTicketsActions.loadTicketSuccess({ ticket, fromServer: true });
            }
        })
    );

    @Effect()
    updateTicket$ = this.actions$.pipe(
        ofType(fromTicketsActions.updateTicket),
        switchMap((data) => this._updateTicketGQL.mutate({ ticket: data.ticket as TicketInput , broadcast:data.broadcast })),
        map((data) => {
            const ticket = data && data.data.updateTicket ? data.data.updateTicket: null;
            if (data['dataPresent']) {
                return fromTicketsActions.ticketSavedLocally();
            }

            if (data.errors) {
                return fromTicketsActions.updateTicketFailure({ error: data.errors });
            }

            return fromTicketsActions.updateTicketSuccess({ ticket });
        })
    );

    @Effect()
    createTicket$ = this.actions$.pipe(
        ofType(fromTicketsActions.createTicket),
        switchMap((data) => this._createTicketGQL.mutate({ ticket: data.ticket as TicketInput })),
        map((data) => {

            const ticket = data && data.data.createTicket? data.data.createTicket : null;

            if (data['dataPresent']) {
                return fromTicketsActions.ticketSavedLocally();
            }

            if (data.errors) {
                return fromTicketsActions.createTicketFailure({ error: data.errors });
            }

            return fromTicketsActions.createTicketSuccess({ ticket });
        })
    );
    
    @Effect()
    loadTicketMediaFiles$ = this.actions$.pipe(
        ofType(fromTicketsActions.LoadTicketsMediaFiles),
        switchMap((data) => this._ticketMediaFilesGQL.
            watch({
                text: data.text,
                ticketNumber: data.ticketNumber,
                page: data.page,
                size: data.size
            })
            .valueChanges),
        map(({ data, errors }) => {

            const mediaFiles = data && data.ticketMediaFiles ? data.ticketMediaFiles : [];
            console.log('effect media files',mediaFiles)
            if (errors) {
                return fromTicketsActions.LoadTicketsMediaFilesFailed({ error: errors });
            }


            else {
                return fromTicketsActions.LoadTicketsMediaFilesSuccess({ MediaFile: mediaFiles });
            }
        })
    );

   
}
