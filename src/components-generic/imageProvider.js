import { useState } from 'react';
import { bucket } from '../aws-amplify/config-env';
import CircularProgress from '@material-ui/core/CircularProgress';

// const imageBaseUrl = 'https://d2y9pdc5bc1adh.cloudfront.net/';
const imageBaseUrl = 'https://img.clubalmanac.com/';
export const otoa = (object) => Buffer.from(JSON.stringify(object)).toString('base64');
export const btoa = (b) => Buffer.from(b, 'base64').toString();
const btoaDebug = (b) => Buffer.from(b.split('/').slice(-1)[0], 'base64').toString();

export const ClubImage = ({ src, width, height, onLoad, style = {}, ...rest }) => {
    const [size, setSize] = useState('none');
    const urlSmall = makeImageUrl(src, 10, 10);
    const urlNormal = makeImageUrl(src, width, height);

    const handleLoad = (newSize) => () => {
        setSize((oldSize => (oldSize === 'normal') ? 'normal' : newSize));
        if (newSize === 'normal' && onLoad) onLoad();
    };

    const imgStyle = (disp) => ({
        objectFit: 'cover', width: '100%', height: '100%', 
        display: (size === disp)? 'block' : 'none'
    });
    const iconStyle = (disp) => ({
        color: 'rgba(0,0,0,0.26)',
        display: (size === disp)? 'block' : 'none'
    })

    return <div {...rest} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress color='inherit' style={iconStyle('none')}/>
        <img src={urlSmall} onLoad={handleLoad('small')} style={{ ...style, ...imgStyle('small') }} />
        <img src={urlNormal} onLoad={handleLoad('normal')} style={{ ...style, ...imgStyle('normal') }} />
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