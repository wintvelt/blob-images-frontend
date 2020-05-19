import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

const imageBaseUrl = 'https://d2y9pdc5bc1adh.cloudfront.net/';
const otoa = (object) => Buffer.from(JSON.stringify(object)).toString('base64');
export const btoa = (b) => Buffer.from(b, 'base64').toString()

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
        "key": 'protected/' + key,
        "edits": {
            "resize": {
                "width": width,
                "height": height,
                "fit": "cover"
            }
        }
    }
    if (key.slice(0,10) !== 'eu-central') console.log({ imageFrom: body })
    return imageBaseUrl + otoa(body);
}