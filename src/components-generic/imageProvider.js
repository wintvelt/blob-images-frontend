import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

const imageBaseUrl = 'https://d2y9pdc5bc1adh.cloudfront.net/';
const otoa = (object) => Buffer.from(JSON.stringify(object)).toString('base64');
export const btoa = (b) => Buffer.from(b, 'base64').toString();
const btoaDebug = (b) => Buffer.from(b.split('/').slice(-1)[0], 'base64').toString();

export const useImage = (url) => {
    const [safeUrl, setSafeUrl] = useState(null);

    useEffect(() => {
        const getImage = async () => {
            const [userId, filename] = url.split('/');
            try {
                const result = await Storage.get(filename, {
                    level: 'protected',
                    identityId: userId
                });
                setSafeUrl(result);
            } catch (error) {
                console.log({ error });
            }
        }
        if (url) getImage();
    }, [url]);

    return safeUrl;
}

export const makeImageUrl = (key, width = 200, height = 200) => {
    if (!key) return '';
    const body = {
        "bucket": "blob-images",
        "key": key,
        "edits": {
            "resize": {
                "width": width,
                "height": height,
                "fit": "cover"
            }
        }
    }
    const isRemote = (key.slice(0,10) === 'protected/');
    if (isRemote) {
        return imageBaseUrl + otoa(body);
    } else {
        return key;
    }
}