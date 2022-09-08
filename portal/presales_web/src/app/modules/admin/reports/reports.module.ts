import { FinancialComponent } from './financial/financial.component';
import { ReportsRoutingModule } from './reports.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OpportunitiesComponent } from './opportunities/opportunities.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [ReportsComponent, FinancialComponent, OpportunitiesComponent]
})
export class ReportsModule { }
