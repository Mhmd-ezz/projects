import { CardiologyFollowupFormComponent } from './patient/cardiology/cardiology-followup-form/cardiology-followup-form.component';
import { CardiologyConditionFormComponent } from './patient/cardiology/cardiology-condtion-form/cardiology-condtion-form.component';
import { SpecialityRedirectGuard } from './../blocks/guards/speciality-router-guard.service';
import { MediaComponent } from './patient/media/media.component';
import { DuplicateMedicalActivityDialogComponent } from './patient/duplicate-medical-activity-dialog/duplicate-medical-activity-dialog.component';
import { ContactDuplicateCheckerModule } from './../blocks/components/contact-duplicate-checker/contact-duplicate-checker.module';
// import { PatientsStoreService } from './../blocks/graphql/store/patientsStore.service';
import { NgModule } from '@angular/core';
import Flow from '@flowjs/flow.js';
import { FlowInjectionToken, NgxFlowModule } from '@flowjs/ngx-flow';
import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
import { EditPatientComponent } from 'app/patients/patient/edit-patient/edit-patient.component';
import { EditPatientCardiologyComponent } from 'app/patients/patient/edit-patient-cardiology/edit-patient-cardiology.component';
import { NgxMaskModule } from 'ngx-mask';
import { QuillModule } from 'ngx-quill';
import { SharedUIModule } from '../blocks/common/shared-ui.module';
//import { MdcDrugInputDialogComponent } from '../blocks/components/mdc-drug-input-dialog/mdc-drug-input-dialog.component';
import { MdcLookupInputAdvancedModule } from '../blocks/components/mdc-lookup-input-advanced/mdc-lookup-input-advnaced.module';
import { SwitchPanelModule } from '../blocks/components/switch-panel/switch-panel.module';
import { SharedMaterialModule } from './../blocks/common/shared-material.module';
import { MdcLookupInputModule } from './../blocks/components/mdc-lookup-input/mdc-lookup-input.module';
import { MdcMedicationInputComponent } from './../blocks/components/mdc-medication-input/mdc-medication-input.component';
import { MdcMedicationViewDialogComponent } from './../blocks/components/mdc-medication-view-dialog/mdc-medication-view-dialog.component';
import { MdcPipesModule } from './../blocks/pipes/pipes.module';
import { PatientService } from './patient.service';
import { EditConditionComponent } from './patient/general/edit-condition/edit-condition.component';
import { EditFollowupComponent } from './patient/general/edit-followup/edit-followup.component';
import { EditGeneralMedicalHistoryDialogComponent } from './patient/general/edit-general-medical-history-dialog/edit-general-medical-history-dialog.component';
import { EditOperationComponent } from './patient/general/edit-operation/edit-operation.component';
import { GeneralMainComponent } from './patient/general/main.component';
import { GeneralMedicalHistoryComponent } from './patient/general/medical-history/medical-history.component';
import { NewConditionComponent } from './patient/general/new-condition/new-condition.component';
import { NewFollowupComponent } from './patient/general/new-followup/new-followup.component';
import { NewOperationComponent } from './patient/general/new-operation/new-operation.component';
import { NewPatientComponent } from './patient/new-patient/new-patient.component';
import { NewPatientCardiologyComponent } from './patient/new-patient-cardiology/new-patient-cardiology.component';
import { PatientSidebarComponent } from './patient/patient-sidebar/patient-sidebar.component';
import { PatientComponent } from './patient/patient.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
// import { MomentModule } from 'ngx-moment';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NgxLowerCaseDirectiveModule } from 'ngx-lower-case-directive';
import { DuplicatePatientDialogComponent } from './patient/duplicate-patient-dialog/duplicate-patient-dialog.component';
import { SharedFontAwsomeModule } from 'app/blocks/common/shared-fontawsome.module';
import { CardiologyMainComponent } from './patient/cardiology/cardiology-main.component';
import { CardiologyMedicalHistoryComponent } from './patient/cardiology/medical-history/cardiology-medical-history.component';
import { CardiologyNewOperationComponent } from './patient/cardiology/new-operation/new-operation.component';
import { CardiologyEditFollowupComponent } from './patient/cardiology/edit-followup/edit-followup.component';
import { CardiologyEditOperationComponent } from './patient/cardiology/edit-operation/edit-operation.component';
import { CardiologyConditionsComponent } from './patient/cardiology/conditions/conditions.component';
import { MdcLookupInputAdvancedPredefinedModule } from 'app/blocks/components/mdc-lookup-input-advanced-predefined/mdc-lookup-input-advanced-predefined.module';
import { EditCardiologyMedicalHistoryDialogComponent } from './patient/cardiology/edit-general-medical-history-dialog/edit-cardiology-medical-history-dialog.component';
import { CardiologyEditConditionComponent } from './patient/cardiology/edit-condition/edit-condition.component';

import { EditSurgeryDialogComponent } from './patient/edit-surgery-dialog/edit-surgery-dialog.component';
import { SurgeryTableAdvancedComponent } from '../blocks/components/surgery-table-advanced/surgery-table-advanced.component';
import { SurgeryTableComponent } from '../blocks/components/surgery-table/surgery-table.component';
import { MdcTelephonenputComponent } from 'app/blocks/components/mdc-telephone-input/mdc-telephone-input.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderService, POSITION, SPINNER, PB_DIRECTION } from "ngx-ui-loader";

import { TagInputComponent } from 'app/blocks/components/tag-input/tag-input.component';
import { TagSelectorModule } from 'app/blocks/components/tag-selector/tag-selector.module';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { GeneralConditionsComponent } from './patient/general/conditions/conditions.component';
import { TodosModule } from 'app/todos/todos.module';

import { AllMediaComponent } from './patient/all-media/all-media.component';
@NgModule({
    declarations: [
        PatientsComponent,
        PatientComponent,
        // MdcLookupInputComponent,
        MdcMedicationInputComponent,
        //MdcDrugInputDialogComponent,
        MdcMedicationViewDialogComponent,
        EditGeneralMedicalHistoryDialogComponent,
        // MdcFormGroupComponent,
        MdcTelephonenputComponent,
        TagInputComponent,

        // @ Patient
        PatientsListComponent,
        PatientSidebarComponent,
        NewPatientComponent,
        NewPatientCardiologyComponent,
        DuplicateMedicalActivityDialogComponent,
        DuplicatePatientDialogComponent,

        // @ Speciality => GENERAL
        GeneralMainComponent,
        GeneralMedicalHistoryComponent,
        GeneralConditionsComponent,
        NewConditionComponent,
        NewFollowupComponent,
        NewOperationComponent,
        EditConditionComponent,
        EditFollowupComponent,
        EditOperationComponent,
        EditPatientComponent,
        EditPatientCardiologyComponent,
        PatientSidebarComponent,
        MediaComponent,
        AllMediaComponent,

        // @ Speciality => Cardio
        CardiologyMainComponent,
        CardiologyMedicalHistoryComponent,
        CardiologyConditionsComponent,
        CardiologyConditionFormComponent,
        CardiologyFollowupFormComponent,
        CardiologyNewOperationComponent,
        CardiologyEditConditionComponent,
        CardiologyEditFollowupComponent,
        CardiologyEditOperationComponent,
        EditCardiologyMedicalHistoryDialogComponent,
        EditSurgeryDialogComponent,
        SurgeryTableComponent,
        SurgeryTableAdvancedComponent,
    ],
    imports: [
        // @ Router
        PatientsRoutingModule,

        NgxMaskModule.forRoot(),

        SwitchPanelModule,
        SharedFontAwsomeModule,

        // @ Common 
        FuseSidebarModule,
        SharedUIModule,
        SharedMaterialModule,
        FuseSharedModule,
        MdcPipesModule,
        MdcDirectivesModule,
        MdcLookupInputModule,
        MdcLookupInputAdvancedModule,
        MdcLookupInputAdvancedPredefinedModule,
        NgxTrimDirectiveModule,
        NgxLowerCaseDirectiveModule,

        // @ 3ird party
        // BreadcrumbModule,
        QuillModule,
        NgxFlowModule,
        // MomentModule,
        TagSelectorModule,
        ContactDuplicateCheckerModule,
        NgxUiLoaderModule,
        NgxMatIntlTelInputModule,

        TodosModule

    ],
    providers: [
        SpecialityRedirectGuard,
        PatientService,
        NgxUiLoaderService,
        {
            provide: FlowInjectionToken,
            useValue: Flow
        },
    ],
    entryComponents: [
        // MdcDrugInputDialogComponent,
        MdcMedicationViewDialogComponent,
        EditGeneralMedicalHistoryDialogComponent,
        DuplicateMedicalActivityDialogComponent,
        DuplicatePatientDialogComponent,
        EditCardiologyMedicalHistoryDialogComponent,
        EditSurgeryDialogComponent,
    ]
})
export class PatientsModule { }
