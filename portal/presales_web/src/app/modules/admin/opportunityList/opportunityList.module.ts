import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunityListComponent } from './opportunityList.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { OpportunitiesListResolver } from './opportunitiesList.resolvers';
import { MatDatepickerModule } from '@angular/material/datepicker';

const routes: Route[] = [
  {
    path: '',
    component: OpportunityListComponent,
    resolve: {
      // opportunities: OpportunitiesListResolver,
    }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSortModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  declarations: [OpportunityListComponent]
})
export class OpportunityListModule { }
