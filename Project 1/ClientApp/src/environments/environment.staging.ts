export const environment = {
    production: true,
    hmr: false,
    requireHttps: true,

    clientId: 'medcilia-assistant',
    scope: 'openid profile media mediaApi medciliaScope api1',

    // -----------------------------------------
    //      @ Online
    // -----------------------------------------
    backEndWs:'wss://medcilia-api-staging.azurewebsites.net/graphql',
    backEnd: 'https://medcilia-api-staging.azurewebsites.net',
    mediaEndpoint: 'https://medcilia-media-staging.azurewebsites.net',
    issuer: 'https://login.medcilia.net',
    redirectUri: 'https://medcilia-ui-staging.azurewebsites.net/',
    silentRefreshRedirectUri: 'https://medcilia-ui-staging.azurewebsites.net/silent-refresh.html',
    postLogoutRedirectUri: 'https://medcilia-ui-staging.azurewebsites.net/',

    //  backEnd: 'http://localhost:24550',
    //  // mediaEndpoint: 'http://localhost:24660',
    //  mediaEndpoint: 'http://localhost:24670',
    //  // mediaEndpoint: 'https://medciliamedia.blob.core.windows.net',
    //  issuer: 'http://localhost:24450',
    //  redirectUri: 'http://localhost:4300/',
    //  silentRefreshRedirectUri: 'http://localhost:4300/silent-refresh.html',
    //  postLogoutRedirectUri: 'http://localhost:4300/',

    // -----------------------------------------
    //      @ Local - Remote
    // -----------------------------------------
    // backEnd: 'http://localhost:24550',
    // mediaEndpoint: 'http://localhost:24660',
    // issuer: 'http://localhost:24450',
    // redirectUri: 'http://localhost:4300/',
    // silentRefreshRedirectUri: 'http://localhost:4300/silent-refresh.html',
    // postLogoutRedirectUri: 'http://localhost:4300/',

    // -----------------------------------------
    //      @ GRAPGQL
    // -----------------------------------------
    // @ Important to update version when graphql schema is updated
    // @ Changing schema version will force the user browser to reset localStorage
    GQL_SCHEMA_VERSION: '0.5',

    // -----------------------------------------
    //      @ OTHERS
    // -----------------------------------------
    imageFallback: 'assets/images/etc/notfound.png',

    timeout: {
        'keepalive_interval': 30,
        'idle_timeout': 60,
        'idle_timeout_countdown': 30,
        'init_idle_state': '',
        'reset_idle_state': '',
        'no_longer_idle': 'You are no longer idle!'
    }
};
