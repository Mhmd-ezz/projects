import { TenantsService } from './tenants.service';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { InternetConnectionService } from './internet-connection.service';
import { SyncOfflineMutation } from 'app/blocks/graphql/SyncOfflineMutation';
import { GraphQLModule } from 'app/blocks/graphql/graphql.module';
import { UserService } from './user.service';
import { ContactsService } from './contacts.service';

@NgModule({
    declarations: [
    ],
    imports: [
        // GraphQLModule
    ],
    providers:[
    ]
})
export class ServicesModule {

    static forRoot(): ModuleWithProviders<ServicesModule> {
        return {
            ngModule: ServicesModule,
            providers: [
                UserService,
                ContactsService,
                InternetConnectionService,
                SyncOfflineMutation,
                TenantsService,
            ]
        };
    }
}
