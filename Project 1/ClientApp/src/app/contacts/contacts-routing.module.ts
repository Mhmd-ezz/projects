import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';


const routes: Routes = [
    {
        path: '',
        component: ContactsComponent,
        data: { breadcrumb: 'Contacts' },
        children: [
            {
                path: '',
                component: ContactsListComponent,
                data: { breadcrumb: 'List' }
            },
            {
                path: 'new-contact',
                component: NewContactComponent,
                data: { breadcrumb: 'New Contact' }
            },
            {
                path: 'edit-contact/:id',
                component: EditContactComponent,
                data: { breadcrumb: 'Edit Contact' }
            },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactsRoutingModule { }
