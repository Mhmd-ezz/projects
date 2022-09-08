import { SharedUIModule } from './../../common/shared-ui.module';
import { MdcFormInfoboxErrorModule } from './../mdc-form-infobox-error/mdc-form-infobox-error.module';
import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { DatePickerModule, DateTimePickerModule, TimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { RecurrenceEditorModule, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { ContactSelectorModule } from 'app/blocks/components/contact-selector/contact-selector.module';
import { ConditionSelectorModule } from '../condition-selector/condition-selector.module';
import { LocationSelectorModule } from './../location-selector/location-selector.module';
import { AppointmentDialogComponent } from './appointment-dialog.component';
import { ConferenceEventTemplateComponent } from './conference-event-template/conference-event-template.component';
import { EventConflictAlertComponent } from './event-conflict-alert/event-conflict-alert.component';
import { FloorEventTemplateComponent } from './floor-event-template/floor-event-template.component';
import { GeneralEventTemplateComponent } from './general-event-template/general-event-template.component';
import { OperationEventTemplateComponent } from './operation-event-template/operation-event-template.component';
import { RecurrenceEditorComponent } from './recurrence-editor/recurrence-editor.component';
import { TimeRangeComponent } from './time-range/time-range.component';
import { VisitsEventTemplateComponent } from './visits-event-template/visits-event-template.component';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
import { RecurrenceSelectorModule } from '../recurrence-selector/recurrence-selector.module';

@NgModule({

    imports: [
        FuseSharedModule,
        SharedMaterialModule,
        MdcDirectivesModule,
        SharedUIModule,

        ScheduleModule,
        RecurrenceEditorModule,
        DateTimePickerModule,
        DatePickerModule,
        TimePickerAllModule,
        ContactSelectorModule,
        ConditionSelectorModule,
        LocationSelectorModule,
        MdcFormInfoboxErrorModule,
        RecurrenceSelectorModule
    ],
    declarations: [
        AppointmentDialogComponent,
        OperationEventTemplateComponent,
        VisitsEventTemplateComponent,
        TimeRangeComponent,
        EventConflictAlertComponent,
        RecurrenceEditorComponent,
        FloorEventTemplateComponent,
        ConferenceEventTemplateComponent,
        GeneralEventTemplateComponent,
    ],
    entryComponents:[
        AppointmentDialogComponent,

    ]
})
export class AppointmentDialogModule { }
