import { createReducer, on, Action } from '@ngrx/store';
import * as ticketsActions from '../actions';
import { MediaFileBase } from 'app/blocks/graphql/generated/bases';
import { Ticket } from 'app/blocks/graphql/generated/gqlServices';

export class TicketsState {
  
    tickets: { items: Ticket[], fromServer: boolean,ticketsTotal:number };
    selectedTicket: { data: Ticket, fromServer: boolean };

    createTicket: Ticket;
    updateTicket: Ticket;
    error:any;
    
    ticketSavedLocally: boolean;
    mediaFile: MediaFileBase[];

    
    eventTicket: any;
}

const initialState: TicketsState = {
    tickets: { items: [], fromServer: false,ticketsTotal:0 }, 
    selectedTicket: { data: null, fromServer: false },
    
    createTicket: null,
    updateTicket: null,
    error:null,

    ticketSavedLocally: false,
    mediaFile: [],

    eventTicket:null
};

const ticketsReducer = createReducer(initialState,

     // -------------------------------------
    // @ Reset Ticket
    // -------------------------------------

    on(ticketsActions.resetTicket, (state: TicketsState) => {
        return {
            ...state,
            error:null,
            updateTicket:null,
            createTicket:null

        };
    }),
     // -------------------------------------
    // @ Reset Media Files
    // -------------------------------------

    on(ticketsActions.ResetMediaFiles, (state: TicketsState) => {
        return {
            ...state,
            error:null,
            mediaFile:[],

        };
    }),
      // -------------------------------------
    // @ READ Ticket
    // -------------------------------------

    on(ticketsActions.loadTicketSuccess, (state: TicketsState, payload) => {
        return {
            ...state,
            error:null,
            selectedTicket:{data:payload.ticket,fromServer:payload.fromServer}
        };
    }),

    on(ticketsActions.loadTicketFailure, (state: TicketsState, payload) => {
        return {
            ...state,
            error:payload.error
            
        };
    }),

    // -------------------------------------
    // @ READ Tickets
    // -------------------------------------

    on(ticketsActions.loadTicketsSuccess, (state: TicketsState, payload) => {
        return {
            ...state,
            error:null,
            tickets: {items: payload.tickets,fromServer: payload.fromServer,ticketsTotal:payload.ticketsTotal}
        };
    }),

    on(ticketsActions.loadTicketsFailure, (state: TicketsState, payload) => {
        return {
            ...state,
            error:payload.error
            
        };
    }),

    // -------------------------------------
    // @ UPDATE Ticket
    // -------------------------------------

    on(ticketsActions.updateTicketSuccess, (state: TicketsState, payload) => {
        return {
            ...state,
            updateTicket: payload.ticket,
            error:null,
            ticketSavedLocally: false,
        };
    }),

    on(ticketsActions.updateTicketFailure, (state: TicketsState,payload) => {
        return {
            ...state,
            error:payload.error
        };
    }),

    // -------------------------------------
    // @ CREATE TICKET
    // -------------------------------------

    on(ticketsActions.createTicketSuccess, (state: TicketsState, payload) => {
        return {
            ...state,
            error:null,
            createTicket: payload.ticket,
            ticketSavedLocally: false,
        };
    }),
    on(ticketsActions.createTicketFailure, (state: TicketsState,payload) => {
        return {
            ...state,
            error:payload.error
        };
    }),

    // -------------------------------------
    // @ Save Locally
    // -------------------------------------
    on(ticketsActions.ticketSavedLocally, (state: TicketsState) => {
        return {
            ...state,
            ticketSavedLocally: true,
        };
    }),    
    
 // -------------------------------------
    // @ Load Media
    // -------------------------------------

    on(ticketsActions.LoadTicketsMediaFilesSuccess, (state: TicketsState, payload) => {
        return {
            ...state,
            error:null,
            mediaFile: payload.MediaFile,
            ticketSavedLocally: false,
        };
    }),
    on(ticketsActions.LoadTicketsMediaFilesFailed, (state: TicketsState,payload) => {
        return {
            ...state,
            error:payload.error
        };
    }),

    on(ticketsActions.onEventTicket, (state:TicketsState, payload) => {
   
        // if(payload.user==payload.data.ticketEvent.from.displayName)
        // {
         
        //     return {
        //         ...state,
        //         error: null
        //     };
        // }
    
        
        //else{
            return {
                ...state,
                eventTicket: payload.data,
                error: null
            };
       // }
        
    }),
);



export function reducer(
    state: TicketsState,
    action: Action
): TicketsState {
    return ticketsReducer(state, action);
}


export const getTickets = (state: TicketsState) => state.tickets;
export const getSelectedTicket = (state: TicketsState) => state.selectedTicket;

export const getCreatedTicket= (state: TicketsState) => state.createTicket;
export const getUpdatedTicket = (state: TicketsState) => state.updateTicket;
export const getError = (state: TicketsState) => state.error;

export const getTicketSavedLocally = (state: TicketsState) => state.ticketSavedLocally;

export const getTicketMediaFiles = (state: TicketsState) => state.mediaFile;

export const getTicketEvent = (state: TicketsState) => state.eventTicket;
 