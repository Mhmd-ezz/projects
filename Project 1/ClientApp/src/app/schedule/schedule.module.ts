import { FuseSidebarModule } from '@fuse/components';
import { FilterComponent } from './filter/filter.component';
import { AppointmentDialogModule } from './../blocks/components/appointment-dialog/appointment-dialog.module';
import { GeneralEventTemplateComponent } from './appointment-dialog/general-event-template/general-event-template.component';
import { ConferenceEventTemplateComponent } from './appointment-dialog/conference-event-template/conference-event-template.component';
import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { DatePickerModule, DateTimePickerModule, TimePickerModule, TimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import {
    AgendaService,
    DayService,
    DragAndDropService,
    MonthAgendaService,
    MonthService,
    RecurrenceEditorModule,
    ResizeService,
    ScheduleModule,
    WeekService,
    WorkWeekService,
} from '@syncfusion/ej2-angular-schedule';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { NewEditContactDialogModule } from 'app/blocks/components/new-edit-contact-dialog/new-edit-contact-dialog.module';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
import { MatProgressButtonsModule } from 'mat-progress-buttons';

import { SharedUIModule } from './../blocks/common/shared-ui.module';
import { NewEditPatientDialogModule } from './../blocks/components/new-edit-patient-dialog/new-edit-patient-dialog.module';
import { EventDialogComponent } from './appointment-dialog/appointment-dialog.component';
import { EventConflictAlertComponent } from './appointment-dialog/event-conflict-alert/event-conflict-alert.component';
import {
    OperationEventTemplateComponent,
} from './appointment-dialog/operation-event-template/operation-event-template.component';
import {
    RecurrenceEditorDialogComponent,
} from './appointment-dialog/recurrence-editor/recurrence-editor-dialog/recurrence-editor-dialog.component';
import { RecurrenceEditorComponent } from './appointment-dialog/recurrence-editor/recurrence-editor.component';
import { TimeRangeComponent } from './appointment-dialog/time-range/time-range.component';
import { VisitsEventTemplateComponent } from './appointment-dialog/visits-event-template/visits-event-template.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { AppScheduleComponent } from './schedule.component';
import { FloorEventTemplateComponent } from './appointment-dialog/floor-event-template/floor-event-template.component';
import { ConditionSelectorModule } from 'app/blocks/components/condition-selector/condition-selector.module';

// import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
@NgModule({
    declarations: [
        AppScheduleComponent,
        FilterComponent,
        EventDialogComponent,
        OperationEventTemplateComponent,
        VisitsEventTemplateComponent,
        TimeRangeComponent,
        EventConflictAlertComponent,
        RecurrenceEditorComponent,
        RecurrenceEditorDialogComponent,
        FloorEventTemplateComponent,
        ConferenceEventTemplateComponent,
        GeneralEventTemplateComponent,
    ],
    imports: [
        ScheduleRoutingModule,
        FuseSharedModule,
        SharedUIModule,
        FuseSidebarModule,
        SharedMaterialModule,

        ScheduleModule,
        RecurrenceEditorModule,
        DateTimePickerModule,
        DatePickerModule,
        TimePickerAllModule,
        // ColorPickerModule,
        MatProgressButtonsModule.forRoot(),

        NewEditPatientDialogModule,
        NewEditContactDialogModule,
        MdcDirectivesModule,
        AppointmentDialogModule,
    ],
    providers: [
        DayService,
        WeekService,
        WorkWeekService,
        MonthService,
        AgendaService,
        MonthAgendaService,
        DragAndDropService,
        ResizeService
    ],
    entryComponents: [
        EventDialogComponent,
        RecurrenceEditorDialogComponent,
    ]

})
export class AppScheduleModule { }
