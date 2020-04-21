import React from 'react';

const baseStyle = {
    textDecoration: 'none',
    color: 'inherit',
}

const UnstyledLink = (props) => {
    const { href, title, target, rel, children, style } = props;
    const linkStyle = { ...baseStyle, ...style };
    return <a href={href} title={title}
        target={target} rel={rel} style={linkStyle}>
        {children}
    </a>
}

export default UnstyledLink;