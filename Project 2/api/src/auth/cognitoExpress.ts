import jwkToPem from 'jwk-to-pem';
import request from 'request-promise';
import jwt from 'jsonwebtoken';
// import { UserService } from '../api/services/UserService';
import { CognitoExpressConfig } from './cognitoExpressConfig';

export class CognitoExpress {
    public userPoolId = '';
    public tokenUse = '';
    public tokenExpiration = 3600000;
    public iss = '';
    public promise: any;
    public pems: any[] = [];

    constructor(config: CognitoExpressConfig
        // , private userService: UserService
        ) {
        if (!config) {
            throw new TypeError(
                'Options not found. Please refer to README for usage example at https://github.com/ghdna/cognito-express'
            );
        }

        if (configurationIsCorrect(config)) {
            this.userPoolId = config.cognitoUserPoolId;
            this.tokenUse = config.tokenUse;
            this.tokenExpiration = config.tokenExpiration || 3600000;
            this.iss = `https://cognito-idp.${config.region}.amazonaws.com/${this
                .userPoolId}`;
            this.promise = this.init(() => {
                // console.log('Init cognito express...');
            });
        }
    }

    public init(callback: any): any {
        return request(`${this.iss}/.well-known/jwks.json`)
            .then(response => {
                this.pems = [];
                const keys = JSON.parse(response).keys;
                for (const key of keys) {
                    const key_id = key.kid;
                    const modulus = key.n;
                    const exponent = key.e;
                    const key_type = key.kty;
                    const jwk = { kty: key_type, n: modulus, e: exponent };
                    const pem = jwkToPem(jwk);
                    this.pems[key_id] = pem;
                }
                callback(true);
            })
            .catch(err => {
                callback(false);
                throw new TypeError(
                    'Unable to generate certificate due to \n' + err
                );
            });
    }

    public async validate(token: string, callback: any): Promise<any> {
        const p = this.promise.then(() => {
            const decodedJwt = jwt.decode(token, { complete: true }) as { [key: string]: any; };

            if (!decodedJwt) { return callback(`Not a valid JWT token`, undefined); }

            if (decodedJwt.payload.iss !== this.iss) {
                return callback(`token is not from your User Pool`, undefined);
            }

            if (decodedJwt.payload.token_use !== this.tokenUse) {
                return callback(`Not an ${this.tokenUse} token`, undefined);
            }

            const kid = decodedJwt.header.kid;
            const pem = this.pems[kid];

            if (!pem) { return callback(`Invalid ${this.tokenUse} token`, undefined); }

            const params = {
                token,
                pem,
                iss: this.iss,
                maxAge: this.tokenExpiration,
            };

            if (callback) {
                jwtVerify(params, callback);
            } else {
                return new Promise((resolve, reject) => {
                    jwtVerify(params, (err: any, result: unknown) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            }
        });

        if (!callback) {
            return p;
        }
    }

    public async validateToken(token: string): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            this.validate(token, async (err: any, response: any) => {

                // If API is not authenticated, Return 401 with error message.
                if (err) {

                    if (err.name === 'TokenExpiredError') {
                        console.log(err.message);
                        // return false;
                    }
                    /*
                        //API is not authenticated, do something with the error.
                        //Perhaps redirect user back to the login page

                        //ERROR TYPES:

                        //If accessTokenFromClient is null or undefined
                        err = {
                            "name": "TokenNotFound",
                            "message": "access token not found"
                        }

                        //If tokenuse doesn't match accessTokenFromClient
                        {
                            "name": "InvalidTokenUse",
                            "message": "Not an id token"
                        }

                        //If token expired
                        err = {
                            "name": "TokenExpiredError",
                            "message": "jwt expired",
                            "expiredAt": "2017-07-05T16:41:59.000Z"
                        }
                        //If token's user pool doesn't match the one defined in constructor
                        {
                            "name": "InvalidUserPool",
                            "message": "access token is not from the defined user pool"
                        }
                    */
                    // handle any error
                    console.log(err.message);
                    reject(err);
                } else {

                    // Else API has been authenticated. Proceed.
                    // action.request.user = response;
                    // const user = await this.userService.findOne({
                    //     where: {
                    //         username: response.username,
                    //         deleteFlag: 0,
                    //     }, relations: ['usergroup'],
                    // });
                    // if (user === undefined) {
                    //     reject(new Error('User exists on AWS Cognito but is missing in local database'));
                    // } else {
                    //     resolve(user.userId);
                    // }
                    resolve(response.username);
                }
            });
        });
    }
}

function configurationIsCorrect(config: CognitoExpressConfig): boolean {
    let configurationPassed = false;
    switch (true) {
        case !config.region:
            throw new TypeError('AWS Region not specified in constructor');
            break;
        case !config.cognitoUserPoolId:
            throw new TypeError(
                'Cognito User Pool ID is not specified in constructor'
            );
            break;
        case !config.tokenUse:
            throw new TypeError(
                "Token use not specified in constructor. Possible values 'access' | 'id'"
            );
            break;
        case !(config.tokenUse === 'access' || config.tokenUse === 'id'):
            throw new TypeError(
                "Token use values not accurate in the constructor. Possible values 'access' | 'id'"
            );
            break;
        default:
            configurationPassed = true;
    }
    return configurationPassed;
}

function jwtVerify(params: any, callback: any): any {
    jwt.verify(
        params.token,
        params.pem,
        {
            issuer: params.iss,
            maxAge: params.maxAge,
        },
        (err: any, payload: any): void => {
            if (err) { return callback(err, undefined); }
            return callback(undefined, payload);
        }
    );
}
