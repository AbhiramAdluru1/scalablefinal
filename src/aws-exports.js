const awsconfig = {
    Auth: {
        region: process.env.REACT_APP_AWS_REGION, // Example: 'us-east-1'
        userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID, // Example: 'us-east-1_XXXXX'
        userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID, // Example: '2jxxxkjsd2jxxx'
        oauth: {
            domain: process.env.REACT_APP_AWS_COGNITO_DOMAIN, // Example: 'yourdomain.auth.us-east-1.amazoncognito.com'
            scope: ['email', 'openid'],
            redirectSignIn: 'http://localhost:3000/', 
            redirectSignOut: 'http://localhost:3000/',
            responseType: 'code'  // or 'token'
        }
    }
};

export default awsconfig;
