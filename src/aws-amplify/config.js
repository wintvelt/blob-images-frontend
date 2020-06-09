const config = {
    s3: {
        REGION: "eu-central-1",
        BUCKET: "blob-images"
    },
    apiGateway: {
        REGION: "eu-central-1",
        URL: "https://l9r82gw5rc.execute-api.eu-central-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "eu-central-1",
        USER_POOL_ID: "eu-central-1_yZTQaYgj6",
        APP_CLIENT_ID: "7h2946k07f1inl7026mson7sf1",
        IDENTITY_POOL_ID: "eu-central-1:866124e3-9ec9-4b77-bdef-8f3c75e58d9b"
    }
};

export const amplifyConfig = {
    Auth: {
        mandatorySignIn: false,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {
        endpoints: [
            {
                name: "blob-images",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION,
            },
        ]
    }
};