import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
// import { TranslateModule } from '@ngx-translate/core';
import { Level, NgLoggerModule } from '@nsalaun/ng-logger';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AngularSplitModule } from 'angular-split';
import { AppComponent } from 'app/app.component';
import { FakeDbService } from 'app/fake-db/fake-db.service';
import { fuseConfig } from 'app/fuse-config';
import { LayoutModule } from 'app/layout/layout.module';
import { ShellComponent } from 'app/main/shell/shell.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NgxUiLoaderConfig, NgxUiLoaderModule, POSITION, SPINNER } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './blocks/auth/core.module';
import { APP_DATE_FORMATS } from './blocks/common/date.adapter';
import { SharedMaterialModule } from './blocks/common/shared-material.module';
import { SharedUIModule } from './blocks/common/shared-ui.module';
import { PdfViewerModule } from './blocks/components/pdf-viewer/pdf-viewer.module';
import { GraphQLModule } from './blocks/graphql/graphql.module';
import { PagerService } from './blocks/services/pager.service';
import { ResizeService } from './blocks/services/resize.service';
import { ServicesModule } from './blocks/services/services.module';
import { TenantsService } from './blocks/services/tenants.service';
import { LoginModule } from './main/login/login.module';
// import { PdfViewerSidebarModule } from './blocks/components/pdf-viewer-sidebar/pdf-viewer-sidebar.module';
import { AppStoreModule } from './store/store.module';

// Set different log level depending on environment.
// const LOG_LEVEL = Level.LOG;
// if (!isDevMode()) {
//    const LOG_LEVEL = Level.ERROR;
// }
let LOG_LEVEL = Level.LOG;
if (environment.production) {
    LOG_LEVEL = Level.ERROR;
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: "white",
    fgsColor: "white",
    fgsPosition: POSITION.centerCenter,

    fgsSize: 40,
    bgsType: SPINNER.squareJellyBox, // background spinner type
    fgsType: SPINNER.squareJellyBox, // foreground spinner type
    // fgsType: SPINNER.ballSpinFadeRotating, // foreground spinner type
    //pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
    //pbThickness: 5, // progress bar thickness
};

const appInitializerFn = (tenantsService: TenantsService) => {
    return () => {
        return of(tenantsService.onAppInit());
    };
};
@NgModule({
    declarations: [
        AppComponent,
        ShellComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxTrimDirectiveModule,
        // @ Medcilia App Modules
        AppRoutingModule,

        //InMemory Database
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),

        LoginModule,
        GraphQLModule,
        ServicesModule.forRoot(),
        // TranslateModule.forRoot(),
        // Material moment date module
        MatMomentDateModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // @ App modules
        LayoutModule,
        SharedMaterialModule,
        SharedUIModule,
        CoreModule.forRoot(),
        // PdfViewerSidebarModule.forRoot(),
        PdfViewerModule,

        // @ Provided in app, bcs it contains entryComponent
        // NewEditContactDialogModule,
        // NewEditPatientDialogModule,
        FontAwesomeModule,

        // @ Logger 
        NgLoggerModule.forRoot(LOG_LEVEL),

        // @ 3ird party
        // BreadcrumbModule,
        AngularSplitModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        AppStoreModule,
        // NgxUiLoaderModule
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),

    ],
    bootstrap: [
        ShellComponent
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appInitializerFn, deps: [TenantsService], multi: true },
        PagerService,
        ResizeService,
        // @ Set Angular material datepicker default adapter
        // {
        //     provide: DateAdapter, useClass: AppDateAdapter
        // },
        {
            provide: DateAdapter, useClass: MomentDateAdapter,
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        },
        { provide: 'windowObject', useValue: window },
        // { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: HttpInterceptorService,
        //     multi: true
        //   }
    ]
})
export class AppModule {
    // constructor(private library: FaIconLibrary) {
    //     library.addIcons(faSquare, faCheckSquare, faClinicMedical);
    // }
}
