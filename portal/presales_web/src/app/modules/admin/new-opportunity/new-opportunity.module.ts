import { ErrorBoxModule } from './../../../core/reusable-components/error-box/error-box.module';
import { UserSelectorModule } from './../../../core/reusable-components/user-selector/user-selector.module';
import { FuseCardModule } from './../../../../@fuse/components/card/card.module';
import { CreateClientModalModule } from './../../../core/reusable-components/create-client-modal/create-client-modal.module';
import { ClientSelectorModule } from './../../../core/reusable-components/client-selector/client-selector.module';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NewOpportunityComponent } from './new-opportunity.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UppyAngularDashboardModule } from '@uppy/angular';

const routes: Route[] = [
    {
        path: '',
        component: NewOpportunityComponent
    }
];

@NgModule({
    declarations: [
        NewOpportunityComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        SharedModule,
        MatRadioModule,
        MatSelectModule,
        MatStepperModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        ClientSelectorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CreateClientModalModule,
        FuseCardModule,
        UserSelectorModule,
        UppyAngularDashboardModule,
        ErrorBoxModule,
    ]
})
export class NewOpportunityModule {
}
