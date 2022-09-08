import { NgModule } from '@angular/core';
import { NewEditContactDialogComponent } from './new-edit-contact-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from '../../common/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseSharedModule } from '@fuse/shared.module';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';

@NgModule({
  imports: [
    FuseSharedModule,
    SharedMaterialModule,
    MdcDirectivesModule
  ],
  declarations: [NewEditContactDialogComponent],
  entryComponents: [NewEditContactDialogComponent]
})
export class NewEditContactDialogModule { }
