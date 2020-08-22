import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

const imageBaseUrl = 'https://d2y9pdc5bc1adh.cloudfront.net/';
export const otoa = (object) => Buffer.from(JSON.stringify(object)).toString('base64');
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

export const makeImageUrl = (key, width, height) => {
    if (!key) return '';
    let body = {
        "bucket": "blob-images",
        "key": key
    }
    if (width || height) {
        let resize = { "fit": "cover" };
        if (width) resize.width = width;
        if (height) resize.height = height;
        body.edits = { resize };
    }
    const isRemote = (key.slice(0, 10) === 'protected/');
    if (isRemote) {
        return imageBaseUrl + otoa(body);
    } else {
        return key;
    }
}