import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ResetPasswordUserComponent } from './reset-password/reset-password.component';
import { RemoveUserComponent } from './remove-user/remove-user.component';

@NgModule({
    declarations: [
        UsersComponent, 
        NewUserComponent, 
        EditUserComponent,
        ResetPasswordUserComponent,
        RemoveUserComponent
    ],
    imports: [
        UsersRoutingModule,

        SharedMaterialModule, 
        MatSlideToggleModule,        
        FuseSharedModule,

    ],
    exports: []
})
export class UsersModule {}
