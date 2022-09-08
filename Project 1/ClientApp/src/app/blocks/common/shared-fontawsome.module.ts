import { faPhotoVideo, faLaptopMedical } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        FontAwesomeModule,
    ],
    exports: [
        FontAwesomeModule,
    ]
})
export class SharedFontAwsomeModule {

    constructor(private library: FaIconLibrary) {
        this.library.addIcons(faPhotoVideo, faLaptopMedical);
    }
}
