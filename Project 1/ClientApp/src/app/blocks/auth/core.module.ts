import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf
} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
    AuthConfig,
    JwksValidationHandler,
    OAuthModule,
    OAuthModuleConfig,
    OAuthResourceServerErrorHandler,
    ValidationHandler,
    OAuthStorage
} from 'angular-oauth2-oidc';

// this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { authConfig } from './auth-config';
import { OAuthCustomResourceServerErrorHandler } from './auth-error';
import { AuthGuardWithForcedLogin } from './auth-guard-with-forced-login.service';
import { AuthGuard } from './auth-guard.service';
import { AuthInterceptor } from './auth-interceptor';
import { authModuleConfig } from './auth-module-config';
import { AuthPublicGuard } from './auth-public-guard.service';
import { AuthService } from './auth.service';


export function oAuthStorageFactory(): OAuthStorage { 
    return localStorage; 
}

@NgModule({
    imports: [
        HttpClientModule,
        OAuthModule.forRoot(),
        NgIdleKeepaliveModule.forRoot()
    ],
    providers: [
        AuthService,
        AuthGuard,
        AuthPublicGuard,
        AuthGuardWithForcedLogin
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                { provide: AuthConfig, useValue: authConfig },
                { provide: OAuthModuleConfig, useValue: authModuleConfig },
                { provide: ValidationHandler, useClass: JwksValidationHandler },
                // ** Critical ** : Keep this as localStorage. The session storage 
                // is lost as soon as the browser considers the session dead.
                { provide: OAuthStorage, useFactory: oAuthStorageFactory },
                {
                    provide: OAuthResourceServerErrorHandler,
                    useClass: OAuthCustomResourceServerErrorHandler
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                }
            ]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only'
            );
        }
    }
}
