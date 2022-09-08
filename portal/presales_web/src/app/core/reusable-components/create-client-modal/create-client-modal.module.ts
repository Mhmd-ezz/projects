import { ErrorBoxModule } from './../error-box/error-box.module';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from './../../../shared/shared.module';
import { CreateClientModalComponent } from './create-client-modal.component';

@NgModule({
  imports: [
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ErrorBoxModule,
  ],
  declarations: [CreateClientModalComponent],
  entryComponents: [
    CreateClientModalComponent,
  ]
})
export class CreateClientModalModule { }
