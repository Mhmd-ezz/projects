import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MdcPipesModule } from 'app/blocks/pipes/pipes.module';
import { MdcFuseSearchBarComponent } from './mdc-search-bar.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { PatientService } from 'app/patients/patient.service';

@NgModule({
    declarations: [
        MdcFuseSearchBarComponent,
    ],
    providers:[
        PatientService,
    ],
    imports: [
        RouterModule,
        FuseSharedModule,

        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MdcPipesModule,
        MatProgressSpinnerModule,

    ],
    exports: [
        MdcFuseSearchBarComponent
    ]
})
export class MdcFuseSearchBarModule {
}
