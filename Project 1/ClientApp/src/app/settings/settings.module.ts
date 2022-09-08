
import { ScheduleComponent } from './schedule/schedule.component';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { RecurringTimeCardComponent } from './rota/rota-form-dialog/recurring-time-card/recurring-time-card.component';
import { RotaFormDialogComponent } from './rota/rota-form-dialog/rota-form-dialog.component';
import { RecurrenceSelectorModule } from './../blocks/components/recurrence-selector/recurrence-selector.module';
import { RotaAddRecurrenceComponent } from './rota/rota-list/rota-add-recurrence/rota-add-recurrence.component';
import { RotaCardComponent } from './rota/rota-list/rota-card/rota-card.component';
import { RotaListComponent } from './rota/rota-list/rota-list.component';
import { RotaComponent } from './rota/rota.component';
import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { BreadcrumbModule } from 'angular-crumbs';
import { SharedMaterialModule } from '../blocks/common/shared-material.module';
import { SharedUIModule } from '../blocks/common/shared-ui.module';
import { FuseSidebarModule } from './../../@fuse/components/sidebar/sidebar.module';
import { DeleteDrugSheetComponent } from './durgs/delete-drug.component';
import { DurgsComponent } from './durgs/durgs.component';
import { GeneralComponent } from './general/general.component';
import { DeleteGrantorSheetComponent } from './grantors/delete-grantor.component';
import { EditGrantorComponent } from './grantors/edit-grantor/edit-grantor.component';
import { GrantorsComponent } from './grantors/grantors.component';
import { NewGrantorComponent } from './grantors/new-grantor/new-grantor.component';
import { DeleteTagSheetComponent } from './tags/delete-tag.component';
import { EditTagComponent } from './tags/edit-tag/edit-tag.component';
import { TagsComponent } from './tags/tags.component';
import { NewTagComponent } from './tags/new-tag/new-tag.component';
import { DeleteLocationSheetComponent } from './locations/delete-location.component';
import { EditLocationComponent } from './locations/edit-location/edit-location.component';
import { LocationsComponent } from './locations/locations.component';
import { NewLocationComponent } from './locations/new-location/new-location.component';
import { DeleteLookupSheetComponent } from './lookups/delete-lookup.component';
import { EditLookupComponent } from './lookups/edit-lookup/edit-lookup.component';
import { LookupsComponent } from './lookups/lookups.component';
import { NewLookupComponent } from './lookups/new-lookup/new-lookup.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsSidebarComponent } from './settings-sidebar/settings-sidebar.component';
import { SettingsComponent } from './settings.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { NewDrugComponent } from './durgs/new-drug/new-drug.component';
import { EditDrugComponent } from './durgs/edit-drug/edit-drug.component';
import { DrugsDataSource } from './durgs/drugs.datasource';
import { GrantorsDataSource } from './grantors/grantors.datasource';
import { TagsDataSource } from './tags/tags.datasource';
import { LookupsStoreService } from 'app/blocks/graphql/store/lookupsStore.service';
import { LookupsService } from './lookups/lookups.service';
import { LookupsDatasource } from './lookups/lookups.datasource';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NgxLowerCaseDirectiveModule } from 'ngx-lower-case-directive';
import { TimePickerModule, TimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { InPlaceEditorAllModule } from '@syncfusion/ej2-angular-inplace-editor';
import { NgxFlowModule, FlowInjectionToken } from '@flowjs/ngx-flow';
import Flow from '@flowjs/flow.js';


@NgModule({
    declarations: [

        // @ Settings Components
        SettingsComponent,
        SettingsSidebarComponent,
        GeneralComponent,
        LocationsComponent,
        NewLocationComponent,
        EditLocationComponent,
        LookupsComponent,
        SubscriptionsComponent,
        NewLookupComponent,
        EditLookupComponent,
        GrantorsComponent,
        NewGrantorComponent,
        EditGrantorComponent,
        TagsComponent,
        NewTagComponent,
        EditTagComponent,
        DurgsComponent,
        NewDrugComponent,
        EditDrugComponent,
        RotaComponent,
        RotaListComponent,
        RotaCardComponent,
        RotaAddRecurrenceComponent,
        RotaFormDialogComponent,
        RecurringTimeCardComponent,
        ScheduleComponent,


        // Sheets
        DeleteLocationSheetComponent,
        DeleteLookupSheetComponent,
        DeleteGrantorSheetComponent,
        DeleteTagSheetComponent,
        DeleteDrugSheetComponent,


    ],
    imports: [
        // @ Router
        SettingsRoutingModule,

        FuseSidebarModule,

        // @ Third
        BreadcrumbModule,
        NgxTrimDirectiveModule,
        NgxLowerCaseDirectiveModule,

        // @ Common used
        SharedUIModule,
        SharedMaterialModule,
        FuseSharedModule,
        TimePickerAllModule,
        RecurrenceSelectorModule,
        InPlaceEditorAllModule,
        ColorPickerModule,


        NgxFlowModule,

    ],
    providers: [
        DrugsDataSource,
        GrantorsDataSource,
        TagsDataSource,
        LookupsStoreService,
        LookupsService,
        LookupsDatasource,
        {
            provide: FlowInjectionToken,
            useValue: Flow
        }
    ],
    entryComponents: [

        // @ Sheets
        DeleteLocationSheetComponent,
        DeleteLookupSheetComponent,
        DeleteGrantorSheetComponent,
        DeleteTagSheetComponent,
        DeleteDrugSheetComponent,
        RotaFormDialogComponent,

    ]
})
export class SettingsModule {
}
