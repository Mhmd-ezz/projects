
export class CognitoExpressConfig {
    public region = '';
    public cognitoUserPoolId = '';
    public tokenUse = 'access'; // Possible Values: access | id
    public tokenExpiration = 3600000; // Up to default expiration of 1 hour (3600000 ms)
}
