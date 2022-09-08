import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcSearchPatientComponent } from './mdc-search-patient.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MdcPipesModule } from '../../pipes/pipes.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { PatientService } from 'app/patients/patient.service';

@NgModule({
    imports: [
        FuseSharedModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MdcPipesModule,
        MatProgressSpinnerModule
    ],
    providers: [
        PatientService,
    ],
    declarations: [MdcSearchPatientComponent],
    exports: [MdcSearchPatientComponent]
})
export class MdcSearchPatientModule { }
