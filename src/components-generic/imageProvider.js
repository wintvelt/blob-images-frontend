import { useState } from 'react';
import { bucket } from '../aws-amplify/config-env';

// const imageBaseUrl = 'https://d2y9pdc5bc1adh.cloudfront.net/';
const imageBaseUrl = 'https://img.clubalmanac.com/';
export const otoa = (object) => Buffer.from(JSON.stringify(object)).toString('base64');
export const btoa = (b) => Buffer.from(b, 'base64').toString();
const btoaDebug = (b) => Buffer.from(b.split('/').slice(-1)[0], 'base64').toString();

export const ClubImage = ({ src, width, height, onLoad, style = {}, ...rest }) => {
    const [size, setSize] = useState(10);
    const url = makeImageUrl(src, size || width, size || height);

    const handleLoad = () => {
        setSize(0);
        onLoad && onLoad();
    };

    return <div {...rest} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={url} onLoad={handleLoad} style={{ ...style, objectFit: 'cover', width: '100%', height: '100%' }} />
    </div>
}

export const makeImageUrl = (key, width, height) => {
    if (!key) return '';
    let body = {
        "bucket": bucket(),
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