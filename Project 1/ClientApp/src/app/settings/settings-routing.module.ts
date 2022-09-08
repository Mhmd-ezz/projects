import { ScheduleComponent } from './schedule/schedule.component';
import { RotaComponent } from './rota/rota.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DurgsComponent } from './durgs/durgs.component';
import { GeneralComponent } from './general/general.component';
import { EditGrantorComponent } from './grantors/edit-grantor/edit-grantor.component';
import { GrantorsComponent } from './grantors/grantors.component';
import { NewGrantorComponent } from './grantors/new-grantor/new-grantor.component';
import { EditLocationComponent } from './locations/edit-location/edit-location.component';
import { LocationsComponent } from './locations/locations.component';
import { NewLocationComponent } from './locations/new-location/new-location.component';
import { EditLookupComponent } from './lookups/edit-lookup/edit-lookup.component';
import { LookupsComponent } from './lookups/lookups.component';
import { NewLookupComponent } from './lookups/new-lookup/new-lookup.component';
import { SettingsComponent } from './settings.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { NewDrugComponent } from './durgs/new-drug/new-drug.component';
import { EditDrugComponent } from './durgs/edit-drug/edit-drug.component';
import { TagsComponent } from './tags/tags.component';
import { NewTagComponent } from './tags/new-tag/new-tag.component';
import { EditTagComponent } from './tags/edit-tag/edit-tag.component';

const routes: Routes = [

    { path: '', redirectTo: '/settings/general', pathMatch: 'full' },
    { path: '/settings', redirectTo: '/settings/general', pathMatch: 'full' },
    {
        path: '',
        component: SettingsComponent,
        data: { breadcrumb: 'Settings' },
        children: [
            { path: 'general', component: GeneralComponent, data: { breadcrumb: 'General' } },
            { path: 'schedule', component: ScheduleComponent, data: { breadcrumb: 'Schedule' } },
            { path: 'rota', component: RotaComponent, data: { breadcrumb: 'Rota' } },
            {
                path: 'locations', data: { breadcrumb: 'Locations' },
                children: [
                    { path: '', component: LocationsComponent, data: { breadcrumb: 'Locations' } },
                    { path: 'new-location', component: NewLocationComponent, data: { breadcrumb: 'New Location' } },
                    { path: 'edit-location/:id', component: EditLocationComponent, data: { breadcrumb: 'Edit Location' } },

                ]
            },
            {
                path: 'lookups', data: { breadcrumb: 'Lookups' },
                children: [
                    { path: '', component: LookupsComponent, data: { breadcrumb: 'Lookups' } },
                    { path: 'new-lookup', component: NewLookupComponent, data: { breadcrumb: 'New Lookup' } },
                    // { path: 'edit-lookup/:id', component: EditLookupComponent, data: { breadcrumb: 'Edit Lookup' } },
                    { path: 'edit-lookup/:groupkey/:text', component: EditLookupComponent, data: { breadcrumb: 'Edit Lookup' } },

                ]
            },
            {
                path: 'grantors', data: { breadcrumb: 'Grantors' },
                children: [
                    { path: '', component: GrantorsComponent, data: { breadcrumb: 'Grantors' } },
                    { path: 'new-grantor', component: NewGrantorComponent, data: { breadcrumb: 'New Grantor' } },
                    { path: 'edit-grantor/:id', component: EditGrantorComponent, data: { breadcrumb: 'Edit Grantor' } },

                ]
            },
            {
                path: 'tags', data: { breadcrumb: 'Tags' },
                children: [
                    { path: '', component: TagsComponent, data: { breadcrumb: 'Tags' } },
                    { path: 'new-tag', component: NewTagComponent, data: { breadcrumb: 'New Tag' } },
                    { path: 'edit-tag/:id', component: EditTagComponent, data: { breadcrumb: 'Edit Tag' } },

                ]
            },
            {
                path: 'drugs', data: { breadcrumb: 'Drugs' },
                children: [
                    { path: '', component: DurgsComponent, data: { breadcrumb: 'Drugs' } },
                    { path: 'new-drug', component: NewDrugComponent, data: { breadcrumb: 'New Drug' } },
                    { path: 'edit-drug/:id', component: EditDrugComponent, data: { breadcrumb: 'Edit Drug' } },

                ]
            },
            {
                path: 'subscriptions', data: { breadcrumb: 'Subscriptions' },
                children: [
                    { path: '', component: SubscriptionsComponent, data: { breadcrumb: 'Subscriptions' } },
                    // { path: 'new-Lookup', component: NewLookupComponent, data: { breadcrumb: 'New Lookup' } },
                    // { path: 'edit-Lookup/:id', component: EditLookupComponent, data: { breadcrumb: 'Edit Lookup' } },

                ]
            },
            {
                path: 'users',
                data: { breadcrumb: 'Users' },
                // loadChildren: './users/users.module#UsersModule',                 
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
