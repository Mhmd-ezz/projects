import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagSelectorComponent } from './tag-selector.component';
import { TagEditorDialogComponent } from './tag-editor-dialog/tag-editor-dialog.component';
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
        TagSelectorComponent,
        TagEditorDialogComponent,
    ],
    entryComponents: [
        TagEditorDialogComponent
    ],
    exports:[
        TagSelectorComponent,
        TagEditorDialogComponent,
    ]
})
export class TagSelectorModule { }
