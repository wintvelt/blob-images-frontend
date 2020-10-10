import { bucket, gateway, userPool, appClient, identityPool } from "./config-env";

const config = {
    s3: {
        REGION: "eu-central-1",
        BUCKET: bucket()
    },
    apiGateway: {
        REGION: "eu-central-1",
        URL: gateway()
    },
    cognito: {
        REGION: "eu-central-1",
        USER_POOL_ID: userPool(),
        APP_CLIENT_ID: appClient(),
        IDENTITY_POOL_ID: identityPool()
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
            {
                name: "invite",
                endpoint: 'https://pzmvrfc9ml.execute-api.eu-central-1.amazonaws.com/dev',
                region: config.apiGateway.REGION,
            }
        ]
    }
};