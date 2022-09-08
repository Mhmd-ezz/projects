import { DeleteBottomSheetModule } from './../../../core/reusable-components/delete-bottom-sheet/delete-bottom-sheet.module';
import { BranchSelectorModule } from './../../../core/reusable-components/branch-selector/branch-selector.module';
import { UsersComponent } from './users.component';
/* eslint-disable no-trailing-spaces */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FuseCardModule } from '@fuse/components/card';
import { CreateClientModalModule } from 'app/core/reusable-components/create-client-modal/create-client-modal.module';
import { ErrorBoxModule } from 'app/core/reusable-components/error-box/error-box.module';
import { SharedModule } from 'app/shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { UsersRoutingModule } from './users.routing.module';
import { UserSelectModule } from 'app/core/reusable-components/user-select/user-select.module';
import { BranchSelectModule } from 'app/core/reusable-components/branch-select/branch-select.module';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UsersRoutingModule,

    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSortModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    // MatBottomSheetModule,
    MatListModule,
    DeleteBottomSheetModule,

    MatRadioModule,
    MatStepperModule,
    MatAutocompleteModule,
    CreateClientModalModule,
    BranchSelectorModule,
    UserSelectModule,
    BranchSelectModule,
    FuseCardModule,
    ErrorBoxModule,

  ],
  declarations: [
    UsersComponent,
    NewComponent,
    EditComponent,
    ListComponent
  ]
})
export class UsersModule { }