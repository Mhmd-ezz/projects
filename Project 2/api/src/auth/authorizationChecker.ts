/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Action } from 'routing-controllers';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { Logger } from '../lib/logger';
import { AuthService } from './AuthService';
import { CognitoExpress } from './cognitoExpress';
// import { UserService } from '../api/services/UserService';
import { env } from '../env';

export function authorizationChecker(connection: Connection): (action: Action, roles: string[]) => Promise<boolean> | boolean {
    const log = new Logger(__filename);
    const authService = Container.get<AuthService>(AuthService);
    // const userService = Container.get<UserService>(UserService);
    const cognitoExpress = new CognitoExpress({
        region: env.cognito.region,
        cognitoUserPoolId: env.cognito.userPoolId,
        tokenUse: 'access',
        tokenExpiration: 3600000,
    }
    // , userService
    );

    return async function innerAuthorizationChecker(action: Action, roles: any): Promise<boolean> {
        // here you can use request/response objects from action
        // also if decorator defines roles it needs to access the action
        // you can use them to provide granular access check
        // checker must return either boolean (true or false)
        // either promise that resolves a boolean value
        // const userId = await authService.parseBasicAuthFromRequest(action.request);
        const accessTokenFromClient = action.request.header('authorization') as string;
        let username = undefined;
        try {
            username = await cognitoExpress.validateToken(accessTokenFromClient);
        } catch (err) {
            log.warn('Failed to validate token: ' + err.message);
            return false;
        }

        if (username === undefined) {
            log.warn('No credentials given');
            return false;
        }

        console.log(roles);

        if (roles.indexOf('customer') !== -1) {
            action.request.user = await authService.validateCustomer(username);
        }
        if (roles.indexOf('vendor') !== -1) {
            action.request.user = await authService.validateVendor(username);
        }
        if (roles.indexOf('ambassador') !== -1) {
            action.request.user = await authService.validateAmbassador(username);
        }
        if (action.request.user === undefined &&
            (roles.length === 0 || roles.indexOf('') !== -1)) {
            action.request.user = await authService.validateUser(username);
        }

        if (action.request.user === undefined) {
            log.warn('Invalid credentials given');
            return false;
        }

        log.info('Successfully checked credentials');
        return true;
    };
}
