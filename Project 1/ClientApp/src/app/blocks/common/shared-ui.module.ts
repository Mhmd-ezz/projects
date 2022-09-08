import { MedicationFormDialogModule } from './../components/medication-form-dialog/medication-form-dialog.module';
import { MedicationsModule } from './../components/medications/medications.module';
import { ConfirmActionSheetComponent } from './../components/confirm-action-sheet/confirm-action-sheet.component';
import { MdcPhotoSwipeModule } from './../components/mdc-photo-swipe/mdc-photo-swipe.module';
import { MdcFormStatusModule } from './../components/mdc-form-status/mdc-form-status.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'angular-crumbs';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { FuseWidgetModule } from './../../../@fuse/components/widget/widget.module';
import { SharedMaterialModule } from './shared-material.module';

import { UploadFilePopupModule } from './../components/upload-file-popup/upload-file-popup.module';
import { AttachFilesDialogModule } from './../components/attach-files-dialog/attach-files-dialog.module';
import { MdcSearchPatientModule } from './../components/mdc-search-patient/mdc-search-patient.module';
import { MdcFormInfoboxErrorModule } from './../components/mdc-form-infobox-error/mdc-form-infobox-error.module';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog-component';
import { MdcFormGroupModule } from './../components/mdc-form-group/mdc-form-group.module';
import { DeleteMediaFileSheetComponent } from '../components/confirm-delete-media-file-sheet/delete-media-file.component';
import { MediaFileListModule } from '../components/media-file-list/media-file-list.module';
import { AllMediaFilesListModule } from '../components/allmedia-files-list/all-media-files-list.module';
import { StickybitsModule } from 'ngx-stickybits';
import { MediaFileViewListModule } from '../components/media-file-view-list/media-file-view-list.module';
import { MdcChipsInputModule } from '../components/mdc-chips-input/mdc-chips-input.module';
import { LocationSelectorModule } from '../components/location-selector/location-selector.module';
import { ContactSelectorModule } from '../components/contact-selector/contact-selector.module';
import { ConditionSelectorModule } from '../components/condition-selector/condition-selector.module';
import {
    PerfectScrollbarModule, PerfectScrollbarConfigInterface,
    PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';
import { MdcDataStatusModule } from '../components/mdc-data-status/mdc-data-status.module';
import { MedicationsMedicalHistoryModule } from '../components/medications-medical-history/medications-medical-history.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    wheelPropagation: true
};

@NgModule({
    declarations: [
        ConfirmDialogComponent,
        DeleteMediaFileSheetComponent,
        ConfirmActionSheetComponent,
    ],
    entryComponents: [
        ConfirmDialogComponent,
        DeleteMediaFileSheetComponent,
        ConfirmActionSheetComponent,

    ],
    imports: [
        DragScrollModule,
        MdcFormGroupModule,
        FuseWidgetModule,
        SharedMaterialModule,
        MdcFormInfoboxErrorModule,
        BreadcrumbModule,
        StickybitsModule,

        // PdfViewerSidebarModule.forRoot(),
        MdcSearchPatientModule,
        AttachFilesDialogModule,
        UploadFilePopupModule,
        ImgFallbackModule,
        MediaFileListModule,
        MediaFileViewListModule,
        MdcFormStatusModule,
        MdcDataStatusModule,
        MdcChipsInputModule,
        MdcPhotoSwipeModule,
        LocationSelectorModule,
        ContactSelectorModule,
        ConditionSelectorModule,
        PerfectScrollbarModule,
        MedicationsModule,
        MedicationsMedicalHistoryModule,
        MedicationFormDialogModule,
        AllMediaFilesListModule

    ],
    exports: [
        DragScrollModule,
        MdcFormGroupModule,
        MdcFormInfoboxErrorModule,
        FuseWidgetModule,
        BreadcrumbModule,
        // PdfViewerSidebarModule,
        MdcSearchPatientModule,
        AttachFilesDialogModule,
        UploadFilePopupModule,
        ImgFallbackModule,
        MediaFileListModule,
        MediaFileViewListModule,
        MdcFormStatusModule,
        MdcDataStatusModule,
        StickybitsModule,
        MdcChipsInputModule,
        MdcPhotoSwipeModule,
        LocationSelectorModule,
        ContactSelectorModule,
        ConditionSelectorModule,
        PerfectScrollbarModule,
        MedicationsModule,
        MedicationsMedicalHistoryModule,
        MedicationFormDialogModule,
        AllMediaFilesListModule

        // DndDirective
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class SharedUIModule { }
