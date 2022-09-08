import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/blocks/auth/auth-guard.service';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    // @ load secured feature modules 
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'settings',
                loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
                data: { breadcrumb: 'Settings' },
                canActivate: [AuthGuard],
            },
            {
                path: 'patients',
                loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule),
                data: { breadcrumb: 'Patients' },
                canActivate: [AuthGuard],
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
                data: { breadcrumb: 'Dashboard' },
                canActivate: [AuthGuard]

            },
            {
                path: 'contacts',
                loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule),
                data: { breadcrumb: 'Contacts' },
                canActivate: [AuthGuard]
            },
            {
                path: 'schedule',
                loadChildren: () => import('./schedule/schedule.module').then(m => m.AppScheduleModule),
                data: { breadcrumb: 'Schedule' },
                canActivate: [AuthGuard]
            },
            {
                path: 'file-manager',
                loadChildren: () => import('./file-manager/file-manager.module').then(m => m.FileManagerModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'todos',
                loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule),
                data: { breadcrumb: 'Todos' },
                canActivate: [AuthGuard]
            },
            {
                path: 'tickets',
                loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule),
                data: { breadcrumb: 'Tickets' },
                canActivate: [AuthGuard]
            },
        ]
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: NoPreloading })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
