import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { FinancialComponent } from './financial/financial.component';
import { ResourcesComponent } from './resources/resources.component';
import { ReportsComponent } from './reports.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/reports/opportunities', pathMatch: 'full' },
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'opportunities',
        component: OpportunitiesComponent,
        data: {}
      },
      {
        path: 'resources',
        component: ResourcesComponent,
        data: {}
      },
      {
        path: 'financial',
        component: FinancialComponent,
        data: {}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
