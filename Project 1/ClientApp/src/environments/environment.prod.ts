export const environment = {
    production: true,
    hmr: false,
    requireHttps: true,

    clientId: 'medcilia-assistant',
    // scope: 'openid profile media mediaApi medciliaScope api1',
    scope: 'openid profile media mediaApi medciliaScope api1',

    // -----------------------------------------
    //      @ Online
    // -----------------------------------------
    backEndWs:'wss://api.medcilia.net/graphql',
    backEnd: 'https://api.medcilia.net',
    mediaEndpoint: 'https://files.medcilia.net',
    issuer: 'https://login.medcilia.net',
    redirectUri: 'https://assistant.medcilia.net/',
    silentRefreshRedirectUri: 'https://assistant.medcilia.net/silent-refresh.html',
    postLogoutRedirectUri: 'https://assistant.medcilia.net/',

    // -----------------------------------------
    //      @ Local - Remote
    // -----------------------------------------
    // backEnd: 'http://localhost:24550',
    // // mediaEndpoint: 'https://files.medcilia.net',
    // // mediaEndpoint: 'http://localhost:24670',
    // mediaEndpoint: 'http://localhost:24600',    
    // // mediaEndpoint: 'https://medciliamedia.blob.core.windows.net',
    // issuer: 'https://localhost:44308',
    // redirectUri: 'http://localhost:4300/',
    // silentRefreshRedirectUri: 'http://localhost:4300/silent-refresh.html',
    // postLogoutRedirectUri: 'http://localhost:4300/',

    // -----------------------------------------
    //      @ GRAPGQL
    // -----------------------------------------
    // @ Important to update version when graphql schema is updated
    // @ Changing schema version will force the user browser to reset localStorage
    GQL_SCHEMA_VERSION: '0.6',

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
