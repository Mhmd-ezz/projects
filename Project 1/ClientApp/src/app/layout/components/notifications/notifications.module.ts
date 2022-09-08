import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationsComponent } from './notifications.component';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { SharedUIModule } from 'app/blocks/common/shared-ui.module';


@NgModule({
    declarations: [
        NotificationsComponent
    ],
    imports     : [
        RouterModule,
        OverlayModule,
        PortalModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        
        SharedUIModule,
        SharedMaterialModule,
        
    ],
    exports     : [
        NotificationsComponent
    ]
})
export class NotificationsModule
{
}
