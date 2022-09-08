import { ViewComponent } from './view/view.component';
import { PublishEmailComponent } from './list/publish-email/publish-email.component';
import { DeleteBottomSheetModule } from 'app/core/reusable-components/delete-bottom-sheet/delete-bottom-sheet.module';
import { FileViewerDialogService } from './../../../core/reusable-components/file-viewer-dialog/file-viewer-dialog.service';
import { ManageComponent } from './manage/manage.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { OpportunitiesRoutingModule } from './opportunites.routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseCardModule } from '@fuse/components/card';
import { UppyAngularDashboardModule } from '@uppy/angular';
import { ClientSelectorModule } from 'app/core/reusable-components/client-selector/client-selector.module';
import { CreateClientModalModule } from 'app/core/reusable-components/create-client-modal/create-client-modal.module';
import { ErrorBoxModule } from 'app/core/reusable-components/error-box/error-box.module';
import { UserSelectorModule } from 'app/core/reusable-components/user-selector/user-selector.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  imports: [
    OpportunitiesRoutingModule,
    SharedModule,
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

    MatRadioModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    ClientSelectorModule,
    CreateClientModalModule,
    FuseCardModule,
    UserSelectorModule,
    UppyAngularDashboardModule,
    ErrorBoxModule,
    DeleteBottomSheetModule,
    MatDialogModule,
  ],
  declarations: [
    ListComponent,
    NewComponent,
    EditComponent,
    ViewComponent,
    ManageComponent,
    PublishEmailComponent,
  ],providers:[
    FileViewerDialogService
  ]
})
export class OpportunitiesModule { }
