import { FuseAlertModule } from './../../../../@fuse/components/alert/alert.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorBoxComponent } from './error-box.component';

@NgModule({
  imports: [
    SharedModule,
    FuseAlertModule
  ],
  exports: [
    ErrorBoxComponent
  ],
  declarations: [ErrorBoxComponent]
})
export class ErrorBoxModule { }
