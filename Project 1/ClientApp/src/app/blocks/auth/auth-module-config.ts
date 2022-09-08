import { OAuthModuleConfig } from 'angular-oauth2-oidc';
import { environment } from 'environments/environment';

const backEndUri = environment.backEnd.toString();

export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: [backEndUri],
    sendAccessToken: true,
  }
};
