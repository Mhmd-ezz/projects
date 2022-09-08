import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecurrenceSelectorComponent } from './recurrence-selector.component';
import { RecurrenceEditorDialogComponent } from './recurrence-editor-dialog/recurrence-editor-dialog.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
import { RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';

@NgModule({
    imports: [
        FuseSharedModule,
        SharedMaterialModule,
        MdcDirectivesModule,
        RecurrenceEditorModule,
        MdcDirectivesModule,


    ],
    declarations: [
        RecurrenceSelectorComponent,
        RecurrenceEditorDialogComponent,
    ],
    entryComponents: [
        RecurrenceEditorDialogComponent
    ],
    exports:[
        RecurrenceSelectorComponent,
        RecurrenceEditorDialogComponent,
    ]
})
export class RecurrenceSelectorModule { }
