export const oktaConfig = {

    clientId: '0oaif4aw1uBTmwHDX5d7',
    issuer: 'https://dev-52275887.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,


}