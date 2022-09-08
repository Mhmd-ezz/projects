import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditTicketComponent } from "./edit-ticket/edit-ticket.component";
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { TicketsListComponent } from "./tickets-list/tickets-list.component";
import { TicketsComponent } from "./tickets.component";

const routes: Routes = [
    {
        path: '',
        component: TicketsComponent,
        data: { breadcrumb: 'Tickets' },
        children: [
            {
                path: '',
                component: TicketsListComponent,
                data: { breadcrumb: 'Tickets' }
            },
            {
                path: 'new-ticket',
                component: NewTicketComponent,
                data: { breadcrumb: 'New Ticket' }
            },
            {
                path: 'edit-ticket/:id',
                component: EditTicketComponent,
                data: { breadcrumb: 'Edit Ticket' }
            },
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TicketsRoutingModule { }