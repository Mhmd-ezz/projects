import { TicketsParams } from "@appStore/model/tickets-params";
import { createAction, props } from "@ngrx/store";
import { Ticket, TicketEventSubscription, TicketEventSubscriptionVariables } from "app/blocks/graphql/generated/gqlServices";

export const ticketSavedLocally = createAction('[TICKETS] Ticket Saved Locally');

export const loadTickets = createAction('[TICKETS] Load Tickets', props<{ variables: TicketsParams  }>());
export const loadTicketsSuccess = createAction('[TICKETS] Load Tickets Success', props<{ tickets: Ticket[], fromServer: boolean,ticketsTotal:number}>());
export const loadTicketsFailure = createAction('[TICKETS] Load Tickets Failure', props<{ error: any }>());


export const loadTicket = createAction('[TICKETS] Load Ticket', props<{ ticketId: string }>());
export const loadTicketSuccess = createAction('[TICKETS] Load Ticket Success', props<{ ticket: Ticket, fromServer: boolean }>());
export const loadTicketFailure = createAction('[TICKETS] Load Ticket Failure', props<{ error:any }>());

export const createTicket = createAction('[TICKETS] Create Ticket', props<{ ticket: Ticket }>());
export const createTicketSuccess = createAction('[TICKETS] Create Ticket Success', props<{ ticket: Ticket }>());
export const createTicketFailure = createAction('[TICKETS] Create Ticket Failure', props<{ error: any}>());

export const updateTicket = createAction('[TICKETS] Update Ticket', props<{ ticket: Ticket ,broadcast:boolean}>());
export const updateTicketSuccess = createAction('[TICKETS] Update Ticket Success', props<{ ticket: Ticket }>());
export const updateTicketFailure = createAction('[TICKETS] Update Ticket Failure', props<{ error: any }>());

export const resetTicket = createAction('[TICKETS] Reset Ticket');

export const LoadTicketsMediaFiles = createAction('[Patients] Load Ticket Media Files', props<{ text: string,ticketNumber:string, page:number,size:number }>());
export const LoadTicketsMediaFilesSuccess = createAction('[Patients] Load Ticket Media Files Success', props<{ MediaFile: any }>());
export const LoadTicketsMediaFilesFailed = createAction('[Patients] Load Ticket Media Files Failed', props<{  error: any}>());
export const ResetMediaFiles = createAction('[TICKETS] Reset Media Files');

// @ Subscriptions
//export const subscribeTicket = createAction('[Subscribtions] subscribe Tickets', props<{ variables: TicketEventSubscriptionVariables }>());
//export const onTicketSuccess = createAction('[Subscribtions] On Tickets Success', props<{ data: TicketEventSubscription['ticketEvent'] }>());
export const onEventTicket = createAction('[Subscribtions] Ticket Event', props<{ data: any,user:string}>());

