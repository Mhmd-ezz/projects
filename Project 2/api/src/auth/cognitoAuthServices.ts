import 'cross-fetch/polyfill';
import { Service } from 'typedi';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import request from 'request';
import {
    CognitoUserPool,
    CognitoUser,
    CognitoUserAttribute,
    ICognitoUserPoolData,
    ISignUpResult,
    // IAuthenticationCallback,
    AuthenticationDetails,
    CognitoRefreshToken
} from 'amazon-cognito-identity-js';
import { env } from '../env';

@Service()
export default class CognitoAuthService {
    private pool_region = 'us-east-2';
    private userPool: CognitoUserPool;
    private poolData: ICognitoUserPoolData;

    constructor() {
        this.poolData = {
            UserPoolId: env.cognito.userPoolId,
            ClientId: env.cognito.clientId,
        };
        this.userPool = new CognitoUserPool(this.poolData);
    }

    public async Register(username: string, email: string, password: string): Promise<any> {

        const attributeList = [];
        attributeList.push(
            new CognitoUserAttribute({
                Name: 'email', Value: email,
            })
        );
        return new Promise<any>((resolve, reject) => {
            this.userPool.signUp(username, password, attributeList, [],
                (err: any, result: any): void => {

                    if (err) {
                        reject(err);
                    } else {
                        // const cognitoUser = (result as ISignUpResult)?.user;
                        const signupResult = result as ISignUpResult;
                        resolve(signupResult);
                    }
                });
        });

    }

    public async Login(username: string, password: string): Promise<any> {

        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        });
        const userData = {
            Username: username,
            Pool: this.userPool,
        };
        const cognitoUser = new CognitoUser(userData);

        return new Promise((resolve, reject) => {

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess(result: any): void {
                    const accessToken = result.getAccessToken().getJwtToken();
                    resolve(accessToken);
                },
                onFailure(err: any): void {
                    reject(err);
                },
                mfaRequired: () => {
                    // MFA is required to complete user authentication.
                    // Get the code from user and call:
                    // cognitoUser.sendMFACode(mfaCode, this)
                },

                newPasswordRequired: (userAttributes) => {

                    // the api doesn't accept this field back
                    delete userAttributes.email_verified;
                    delete userAttributes.phone_number_verified;
                    console.log('new Password required !');
                    // cognitoUser.completeNewPasswordChallenge(password,
                    //     userAttributes, this.callbacks(ca));
                },
            });
        });
    }

    public async ForgotPassword(username: string): Promise<any> {

        const userData = {
            Username: username,
            Pool: this.userPool,
        };
        const cognitoUser = new CognitoUser(userData);

        return new Promise((resolve, reject) => {

            cognitoUser.forgotPassword({
                onSuccess(result: any): void {
                    resolve(result);
                },
                onFailure(err: any): void {
                    reject(err);
                },
                // inputVerificationCode?: (data: any) => void;
                inputVerificationCode: (data) => {
                    // MFA is required to complete user authentication.
                    // Get the code from user and call:
                    // const verificationCode = prompt('Please input verification code ', '');
                    // const newPassword = prompt('Enter new password ', '');
                    // cognitoUser.confirmPassword(verificationCode, newPassword, {
                    //     onSuccess(): void {
                    //         resolve(true);
                    //     },
                    //     onFailure(err: any): void {
                    //         reject(err);
                    //     },
                    // });
                    const err = new Error('Input verification required ' + data);
                    reject(err);
                },
            });
        });
    }

    public async ConfirmPassword(username: string, verificationCode: string, newPassword: string): Promise<any> {
        const userData = {
            Username: username,
            Pool: this.userPool,
        };
        const cognitoUser = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
            cognitoUser.confirmPassword(verificationCode, newPassword, {
                onSuccess(): void  {
                    resolve(true);
                },
                onFailure(err: any): void  {
                    reject(err);
                },                
            });
        });
    }

    public async Logout(username: string): Promise<any> {

        const userData = {
            Username: username,
            Pool: this.userPool,
        };
        const cognitoUser = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
            cognitoUser.signOut();

            cognitoUser.globalSignOut({
                onSuccess(result: any): void {
                    resolve(result);
                },
                onFailure(err: any): void {
                    reject(err);
                },
            });
        });
    }

    public async Delete(username: string): Promise<any> {

        const userData = {
            Username: username,
            Pool: this.userPool,
        };
        const cognitoUser = new CognitoUser(userData);

        return new Promise((resolve, reject) => {

            cognitoUser.deleteUser((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    public Validate(token: string, callback: any): void {

        request(`https://cognito-idp.${this.pool_region}.amazonaws.com/${this.poolData.UserPoolId}/.well-known/jwks.json`, {
            json: true,
        }, (error: Error, response: any, body: any) => {
            if (!error && response.status === 200) {
                const pems = [];
                let pem: string;
                const keys = body.keys;
                for (const key of keys) {
                    const key_id = key.kid;
                    const modulus = key.n;
                    const exponent = key.e;
                    const key_type = key.kty;
                    const jwk = {
                        kty: key_type,
                        n: modulus,
                        e: exponent,
                    };
                    pem = jwkToPem(jwk);
                    pems[key_id] = pem;
                }

                const decodedJwt = jwt.decode(token, { complete: true }) as { [key: string]: any; };
                if (!decodedJwt) {
                    console.log('Not a valid Jwt Token');
                    callback(new Error('Not a valid Jwt Token'));
                }

                const kid = decodedJwt.header.kid;
                pem = pems[kid];
                if (!pem) {
                    console.log('Invalid token');
                    callback(new Error('Invalid token'));
                }

                jwt.verify(token, pem, (err: any) => {

                    if (err) {
                        console.log('Invalid token');
                        callback(new Error('Invalid token'));
                    } else {
                        console.log('Valid token');
                        callback(undefined, 'Valid token');
                    }
                });
            } else {
                console.log('Error! Unable to download JWKs');
                callback(error);
            }
        });
    }

    // public ValidateMiddleware(req: Request, res: Response, next: any) {
    //     // console.log(this.pool_region);
    //     // next();

    //     const token = req.headers.authorization as string;
    //     const url = `https://cognito-idp.${this.pool_region}.amazonaws.com/${this.poolData.UserPoolId}/.well-known/jwks.json`;
    //     // console.log(url)
    //     request({
    //         url,
    //         json: true,
    //     }, function(error: any, response: any, body: any) {
    //         if (!error && response.statusCode === 200) {
    //             const pems = [];
    //             const keys = body.keys;
    //             for (let i = 0; i < keys.length; i++) {
    //                 const key_id = keys[i].kid;
    //                 const modulus = keys[i].n;
    //                 const exponent = keys[i].e;
    //                 const key_type = keys[i].kty;
    //                 const jwk = { kty: key_type, n: modulus, e: exponent };
    //                 const pem = jwkToPem(jwk);
    //                 pems[key_id] = pem;
    //             }
    //             const decodedJwt = jwt.decode(token, { complete: true }) as { [key: string]: any; };
    //             if (!decodedJwt) {
    //                 console.log('Not a valid JWT token');
    //                 res.status(401);
    //                 return res.send('Invalid token');
    //             }
    //             const kid = decodedJwt.header.kid;
    //             const pem = pems[kid];
    //             if (!pem) {
    //                 console.log('Invalid token');
    //                 res.status(401);
    //                 return res.send('Invalid token');
    //             }
    //             jwt.verify(token, pem, function(err) {
    //                 if (err) {
    //                     console.log('Invalid Token.');
    //                     res.status(401);
    //                     return res.send('Invalid tokern');
    //                 } else {
    //                     console.log('Valid Token.');
    //                     return next();
    //                 }
    //             });
    //         } else {
    //             console.log('Error! Unable to download JWKs');
    //             res.status(500);
    //             return res.send('Error! Unable to download JWKs');
    //         }
    //     });
    // }

    public renewTokens(username: string): void {
        const RefreshToken = new CognitoRefreshToken({
            RefreshToken: 'your_refresh_token_from_a_previous_login',
        });

        const userPool = new CognitoUserPool(this.poolData);

        const userData = {
            Username: username,
            Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.refreshSession(RefreshToken, (err, session) => {
            if (err) {
                console.log(err);
            } else {
                const retObj = {
                    access_token: session.accessToken.jwtToken,
                    id_token: session.idToken.jwtToken,
                    refresh_token: session.refreshToken.token,
                };
                console.log(retObj);
            }
        });
    }

    public async ChangePassword(username: string, password: string, newPassword: string): Promise<any> {
        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        });

        const userData = {
            Username: username,
            Pool: this.userPool,
        };
        const cognitoUser = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess(): void {
                    cognitoUser.changePassword(password, newPassword, (err, result) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            console.log('Successfully changed password of the user.');
                            console.log(result);
                            resolve(result);
                        }
                    });
                },
                onFailure(err: any): void {
                    console.log(err);
                    reject(err);
                },
            });
        });
    }
    // private callbacks(callback: any, cognitoUser: CognitoUser, password: string): IAuthenticationCallback {
    //     const callbacks: IAuthenticationCallback = {
    //         onSuccess(result: any): void {
    //             const accessToken = result.getAccessToken().getJwtToken();
    //             callback(undefined, accessToken);
    //         },
    //         onFailure(err: any): void {
    //             callback(err);
    //         },
    //         mfaRequired: () => {
    //             // MFA is required to complete user authentication.
    //             // Get the code from user and call:
    //             // cognitoUser.sendMFACode(mfaCode, this)
    //         },

    //         newPasswordRequired: (userAttributes) => {

    //             // the api doesn't accept this field back
    //             delete userAttributes.email_verified;
    //             delete userAttributes.phone_number_verified;

    //             cognitoUser.completeNewPasswordChallenge(password,
    //                 userAttributes, callbacks);
    //         },
    //     };
    //     return callbacks;
    // }
}
