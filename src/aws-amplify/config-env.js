const makeSwitch = (devValue, defaultValue) => {
    switch (process.env.NODE_ENV) {
        case 'development': {
            return devValue;
        }
        default: {
            return defaultValue;
        }
    }
};

export const gateway = () => makeSwitch(
    'https://api-dev.clubalmanac.com',
    'https://api.clubalmanac.com'
);

export const bucket = () => makeSwitch(
    'blob-images-dev',
    'blob-images'
);

export const userPool = () => makeSwitch(
    'eu-central-1_3N6XUNPAn',
    'eu-central-1_yZTQaYgj6'
);
export const appClient = () => makeSwitch(
    '1rckvfb8fgkmilfpp541suknu7',
    '7h2946k07f1inl7026mson7sf1'
);
export const identityPool = () => makeSwitch(
    'eu-central-1:26957302-975e-4f3e-ba2f-6a10e9030518',
    'eu-central-1:866124e3-9ec9-4b77-bdef-8f3c75e58d9b'
);