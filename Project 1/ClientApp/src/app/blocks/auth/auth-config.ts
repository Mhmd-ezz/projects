import { AuthConfig } from 'angular-oauth2-oidc';

import { environment } from 'environments/environment';

export const authConfig: AuthConfig = {
    issuer: environment.issuer,
    clientId: environment.clientId,
    redirectUri: environment.redirectUri,
    silentRefreshRedirectUri: environment.silentRefreshRedirectUri,
    postLogoutRedirectUri: environment.postLogoutRedirectUri,
    scope: environment.scope,
    requireHttps: environment.requireHttps,

    silentRefreshTimeout: 20000, // (ms), try 5000 For faster testing
    timeoutFactor: 0.80, // try 0.25 For faster testing
    sessionChecksEnabled: false,
    showDebugInformation: false, // Also requires enabling "Verbose" level in devtools
    clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040
};
