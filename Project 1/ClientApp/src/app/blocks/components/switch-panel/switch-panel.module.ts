import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FuseSharedModule } from '@fuse/shared.module';
import { SwitchPanelComponent } from './switch-panel.component';


@NgModule({
    declarations: [
        SwitchPanelComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatTooltipModule,
        FuseSharedModule
    ],
    exports: [
        SwitchPanelComponent
    ]
})
export class SwitchPanelModule {
}
