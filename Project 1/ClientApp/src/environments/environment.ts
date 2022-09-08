// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr: false,
    requireHttps: false,
    clientId: 'medcilia-assistant',
    scope: 'openid profile media mediaApi medciliaScope api1',
    backEndWs:'ws://localhost:24550/graphql',
    backEnd: 'http://localhost:24550',
    // mediaEndpoint: 'https://files.medcilia.net',
    mediaEndpoint: 'http://localhost:24600',
    // mediaEndpoint: 'http://localhost:24600',    
    // mediaEndpoint: 'https://medciliamedia.blob.core.windows.net',
    issuer: 'https://localhost:44308',
    redirectUri: 'http://localhost:4300/',
    silentRefreshRedirectUri: 'http://localhost:4300/silent-refresh.html',
    postLogoutRedirectUri: 'http://localhost:4300/',
    
    // -----------------------------------------
    //      @ GRAPGQL
    // -----------------------------------------
    // @ Important to update version when graphql schema is updated
    // @ Changing schema version will force the user browser to reset localStorage
    GQL_SCHEMA_VERSION: '0.6',

    // -----------------------------------------
    //      @ OTHERS
    // -----------------------------------------
    imageFallback : 'assets/images/etc/notfound.png',

    timeout : {
        'keepalive_interval': 30,
        'idle_timeout': 60,
        'idle_timeout_countdown': 30,
        'init_idle_state': '',
        'reset_idle_state': '',
        'no_longer_idle': 'You are no longer idle!'
      }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
