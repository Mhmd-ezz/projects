import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';
import { LoginComponent } from './login.component';
import { AuthPublicGuard } from '../../blocks/auth/auth-public-guard.service';

const routes = [

    {
        path: 'login',
        data: { breadcrumb: 'Login' },
        component: LoginComponent,
        canActivate: [AuthPublicGuard]
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],    
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        // CoreModule.forRoot(),

        FuseSharedModule
    ],
    providers:[
    ]
})
export class LoginModule {
}
