import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteBottomSheetComponent } from './delete-bottom-sheet.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    DeleteBottomSheetComponent
  ],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MatListModule,
  ],
  exports:[
    DeleteBottomSheetComponent
  ]
})
export class DeleteBottomSheetModule { }
