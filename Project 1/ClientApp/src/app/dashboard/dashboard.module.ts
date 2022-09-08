import { TableEventsComponent } from './all/table-events/table-events.component';
import { AllComponent } from './all/all.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { BreadcrumbModule } from 'angular-crumbs';

@NgModule({
    imports: [
        DashboardRoutingModule,
        FuseSharedModule,
        SharedMaterialModule,
        BreadcrumbModule,
    ],
    declarations: [
        DashboardComponent,
        AllComponent,
        TableEventsComponent
    ]
})
export class DashboardModule { }
