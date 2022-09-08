import { EditContactComponent } from './edit-contact/edit-contact.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { SharedUIModule } from 'app/blocks/common/shared-ui.module';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NgxLowerCaseDirectiveModule } from 'ngx-lower-case-directive';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';

@NgModule({
    declarations: [
        ContactsComponent,
        ContactsListComponent,
        NewContactComponent,
        EditContactComponent
    ],
    imports: [
        SharedUIModule,
        SharedMaterialModule,
        FuseSharedModule,
        ContactsRoutingModule,
        NgxTrimDirectiveModule,
        NgxLowerCaseDirectiveModule,
        MdcDirectivesModule
    ],
    providers: [
        // FormUtilsService,
    ]

})
export class ContactsModule { }
