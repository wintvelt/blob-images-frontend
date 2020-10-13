import React, { useMemo } from 'react';

const Rating = ({ value, dark }) => {
    const [color, sign] = (value > 0) ?
        [(dark) ? 'green' : 'lightgreen', '+']
        : (value < 0) ? ['red', '']
            : ['gray', ''];
    const myStyle = useMemo(() => ({ color }), [color]);
    return <span style={myStyle}>{`${sign}${value || 0}`}</span>
}

export default Rating;