import React from 'react';

const Image = (props) => {
    const { src, alt, photographer, photographerLink, className } = props;
    const creditStyle = {
        position: 'absolute',
        bottom: '12px',
        right: '8px',
    };
    const linkStyle = {
        backgroundColor: 'black',
        color: 'white',
        textDecoration: 'none',
        padding: '4px 6px',
        fontFamily: '-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, '
            + '&quot;Helvetica Neue&quot;, Helvetica, Ubuntu, '
            + 'Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif',
        fontSize: '12px',
        fontWeight: 'bold',
        lineHeight: '1.2',
        display: 'inline-block',
        borderRadius: '3px'
    };
    const logoStyle = {
        height: '12px',
        width: 'auto',
        position: 'relative',
        verticalAlign: 'middle',
        top: '-2px',
        fill: 'white',
    };
    const href = 'https://unsplash.com/@'
        + photographerLink
        + '?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge';
    const title = 'Download free do whatever you want high-resolution photos from ' + photographer;
    return <div style={{ position: 'relative' }}>
        <img alt={alt} src={encodeURI(src)} className={className} />
        {photographerLink && <div style={creditStyle}>
            <span style={{ fontSize: '12px' }}>
                image credit: {' '}
            </span>
            <a style={linkStyle}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={title}>
                <span style={{ display: 'inline-block', padding: '2px 3px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={logoStyle} viewBox="0 0 32 32">
                        <title>unsplash-logo</title>
                        <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
                    </svg>
                </span>
                <span style={{ display: 'inline-block', padding: '2px 3px' }}>
                    {photographer}
                </span>
            </a>
        </div>}
    </div>
    const a = decodeURL
}

export default Image;