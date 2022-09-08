import { MdcPipesModule } from 'app/blocks/pipes/pipes.module';
import { SharedMaterialModule } from './../../common/shared-material.module';
import { ContactDuplicateCheckerComponent } from './contact-duplicate-checker.component';
import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
// import { MomentModule } from 'ngx-moment';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        FuseSharedModule,
        // MomentModule,
        SharedMaterialModule,
        RouterModule,
        MdcPipesModule
    ],
    declarations: [ContactDuplicateCheckerComponent],
    exports: [ContactDuplicateCheckerComponent]
})
export class ContactDuplicateCheckerModule { }
