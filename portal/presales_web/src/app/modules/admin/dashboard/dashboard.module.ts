import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import { dashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { MomentModule } from 'ngx-moment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// import {NgxLoadingSkeletonModule} from 'ngx-loading-skeleton';
@NgModule({
    declarations: [
      DashboardComponent
    ],
    imports     : [
        RouterModule.forChild(dashboardRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatSelectModule,
        MatFormFieldModule,
        NgApexchartsModule,
        TranslocoModule,
        SharedModule,
        MomentModule
    ]
})
export class DashboardModule
{
}
