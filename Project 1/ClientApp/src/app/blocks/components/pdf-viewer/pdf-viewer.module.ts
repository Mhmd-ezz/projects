import { NgModule } from '@angular/core';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';

import { FuseSharedModule } from './../../../../@fuse/shared.module';
import { PdfViewerComponent } from './pdf-viewer.component';

@NgModule({
    imports: [
        FuseSharedModule,
        SharedMaterialModule,
    ],
    declarations: [PdfViewerComponent],
    exports: [PdfViewerComponent],
    entryComponents: [PdfViewerComponent],
})
export class PdfViewerModule {
    // static forRoot(): ModuleWithProviders {
    //     return {
    //         ngModule: PdfViewerModule,
    //         providers: [
    //             PdfViewerService
    //         ]
    //     };
    // }
}
