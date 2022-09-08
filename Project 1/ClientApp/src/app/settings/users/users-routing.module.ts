import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { UsersComponent } from './users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ResetPasswordUserComponent } from './reset-password/reset-password.component';
import { RemoveUserComponent } from './remove-user/remove-user.component';

const routes: Route[] = [
    {
        path: '',
        component: UsersComponent,
        data: { breadcrumb: 'Users' }
    },
    {
        path: 'new-user',
        component: NewUserComponent,
        data: { breadcrumb: 'New User' }
    },
    {
        path: 'edit-user/:id',
        component: EditUserComponent,
        data: { breadcrumb: 'Edit User' }
    },
    {
        path: 'reset-password/:id',
        component: ResetPasswordUserComponent,
        data: { breadcrumb: 'Reset User Password' }
    },
    {
        path: 'remove-user/:id',
        component: RemoveUserComponent,
        data: { breadcrumb: 'Remove User' }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
