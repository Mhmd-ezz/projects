/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
import { AuthRoleBasedGuard } from './core/auth/guards/authRoleBased.guard';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'opportunities' },

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'opportunities' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [PublicGuard],
        canActivateChild: [PublicGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [ProtectedGuard],
        canActivateChild: [ProtectedGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) },
            { path: 'error401', loadChildren: () => import('app/modules/auth/error401/error-401.module').then(m => m.Error500Module) }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [ProtectedGuard, AuthRoleBasedGuard], // AuthRoleBasedGuard
        canActivateChild: [ProtectedGuard, AuthRoleBasedGuard], // AuthRoleBasedGuard
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule) },
            // { path: 'new-opportunity', loadChildren: () => import('app/modules/admin/new-opportunity/new-opportunity.module').then(m => m.NewOpportunityModule) },
            // { path: 'opportunity-list', loadChildren: () => import('app/modules/admin/opportunityList/opportunityList.module').then(m => m.OpportunityListModule) },
            { path: 'products', loadChildren: () => import('app/modules/admin/products/products.module').then(m => m.ProductsModule) },
            { path: 'opportunities', loadChildren: () => import('app/modules/admin/opportunities/opportunities.module').then(m => m.OpportunitiesModule) },
            { path: 'clients', loadChildren: () => import('app/modules/admin/clients/clients.module').then(m => m.ClientsModule) },
            { path: 'branches', loadChildren: () => import('app/modules/admin/branches/branches.module').then(m => m.BranchesModule) },
            { path: 'users', loadChildren: () => import('app/modules/admin/users/users.module').then(m => m.UsersModule) },
            { path: 'dashboard', loadChildren: () => import('app/modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'reports', loadChildren: () => import('app/modules/admin/reports/reports.module').then(m => m.ReportsModule) },

            { path: 'demos', loadChildren: () => import('app/modules/admin/demos-frame/demos-frame.module').then(m => m.DemosFrameModule) },
        ]
    }
];
