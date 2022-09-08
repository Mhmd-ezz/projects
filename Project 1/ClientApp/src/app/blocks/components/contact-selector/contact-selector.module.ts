import { MdcDirectivesModule } from './../../directives/directives-module';
import { NewEditContactDialogModule } from './../new-edit-contact-dialog/new-edit-contact-dialog.module';
import { NgModule } from '@angular/core';
import { ContactSelectorComponent } from './contact-selector.component';
import { SharedMaterialModule } from '../../common/shared-material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { SelectionNavigatorSheetComponent } from './selection-navigator.component';
import { NewEditPatientDialogModule } from '../new-edit-patient-dialog/new-edit-patient-dialog.module';

@NgModule({
    imports: [
        FuseSharedModule,
        SharedMaterialModule,
        NewEditContactDialogModule,
        NewEditPatientDialogModule,
        MdcDirectivesModule,

    ],
    declarations: [ContactSelectorComponent, SelectionNavigatorSheetComponent],
    entryComponents: [SelectionNavigatorSheetComponent],
    exports: [ContactSelectorComponent]
})
export class ContactSelectorModule { }
