import { memo, useEffect, useRef, useState } from 'react';
import { bucket } from '../aws-amplify/config-env';
import { usePalette } from 'react-palette';
import Icon from '@material-ui/core/Icon';

// const imageBaseUrl = 'https://d2y9pdc5bc1adh.cloudfront.net/';
const imageBaseUrl = 'https://img.clubalmanac.com/';
export const otoa = (object) => Buffer.from(JSON.stringify(object)).toString('base64');
export const btoa = (b) => Buffer.from(b, 'base64').toString();
const btoaDebug = (b) => Buffer.from(b.split('/').slice(-1)[0], 'base64').toString();

const imgStyle = (disp, size, contain = false) => ({
    objectFit: (contain) ? 'contain' : 'cover',
    width: '100%', height: '100%',
    display: (size === disp) ? 'block' : 'none',
    willChange: 'transform',
    transition: 'transform .5s ease',
});
const linkStyle = (disp, size) => ({
    width: '100%', height: '100%',
    display: (size === disp) ? 'block' : 'none',
});

const iconStyle = (disp, size) => ({
    color: 'rgba(0,0,0,0.26)',
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: '100%',
    width: '100%',
    alignItems: 'center', justifyContent: 'center',
    display: (size === disp) ? 'flex' : 'none'
});
const bigIconStyle = { fontSize: '40px' };

const ImagePropsAreEqual = (prevProps, nextProps) => (
    (prevProps.src === nextProps.src) &&
    (prevProps.fullsizeSrc === nextProps.fullsizeSrc) &&
    (prevProps.style === nextProps.style) &&
    (prevProps.width === nextProps.width) &&
    (prevProps.height === nextProps.height)
);

export const useIsMounted = () => {
    const isMounted = useRef(true)

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    return isMounted; // returning "isMounted.current" wouldn't work because we would return unmutable primitive
}

const BaseClubImage = ({ src, fullsizeSrc, width, height, onLoad, style = {}, withLink, contain, ...rest }) => {
    const isMounted = useIsMounted();
    const isLocal = (src && src.slice(0, 1) === '/');
    const [size, setSize] = useState((isLocal) ? 'normal' : 'none');
    const urlSmall = (isLocal) ? src : makeImageUrl(src, 10, 10);
    const urlNormal = (isLocal) ? src :
        (!width && !height && fullsizeSrc) ? fullsizeSrc :
            makeImageUrl(src, width, height);
    const backgroundColor = useCoverColorDirect(urlNormal);

    if (!src) return null;

    const handleLoad = (newSize) => (event) => {
        if (isMounted.current) {
            setSize((oldSize => (oldSize === 'normal') ? 'normal' : newSize));
            if (newSize === 'normal' && onLoad) onLoad(event);
        }
    };

    const normalStyle = (state) => ({
        ...style,
        ...imgStyle(state, size, contain),
        backgroundColor: backgroundColor?.lightVibrant + 'A0'
    });

    return <div {...rest} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={iconStyle('none', size)}>
            <Icon className={'pulse-icon'} style={bigIconStyle}>image</Icon>
        </div>
        {(!isLocal) &&
            <img src={urlSmall} onLoad={handleLoad('small')} style={normalStyle('small')}
            />
        }
        {(withLink) && <a href={urlNormal} target='_blank' rel='noopener noreferrer' style={linkStyle('normal', size)}>
            <img src={urlNormal} onLoad={handleLoad('normal')}
                style={normalStyle('normal')} />
        </a>}
        {(!withLink) && < img src={urlNormal} onLoad={handleLoad('normal')}
            style={normalStyle('normal')} />}
    </div>
}

export const ClubImage = memo(
    BaseClubImage,
    ImagePropsAreEqual
);

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
    const isRemote = (key.slice(0, 10) === 'protected/' || key.slice(0, 7) === 'public/');
    if (isRemote) {
        return imageBaseUrl + otoa(body);
    } else {
        return key;
    }
}

export const useCoverColorDirect = (madeUrl) => {
    const { data } = usePalette(madeUrl);
    return data;
};

export const useCoverColor = (url) => {
    const urlSmall = makeImageUrl(url, 200, 100);
    const { data } = usePalette(urlSmall);
    return data;
};