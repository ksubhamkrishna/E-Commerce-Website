export const oktaConfig = {

    clientId: '0oai9t9ejoFTu9xid5d7',
    issuer: 'https://dev-02143905.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,


}