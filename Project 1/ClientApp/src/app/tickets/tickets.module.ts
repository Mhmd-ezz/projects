import { NgModule } from '@angular/core';
import { NgxDnDModule } from '@swimlane/ngx-dnd';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { TicketsComponent } from './tickets.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';


import { SharedUIModule } from 'app/blocks/common/shared-ui.module';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { TicketsRoutingModule } from './tickets-routing.module';
import { NgxFlowModule } from '@flowjs/ngx-flow';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        TicketsComponent,
        TicketsListComponent,
        NewTicketComponent,
        EditTicketComponent,
    ],
    imports: [
        SharedUIModule,
        SharedMaterialModule,

        TicketsRoutingModule,
        HttpClientModule, AngularEditorModule,
        NgxDnDModule,

        FuseSharedModule,
        FuseSidebarModule,
        NgxFlowModule
    ]
})
export class TicketsModule {
}
