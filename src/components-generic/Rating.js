import React, { useMemo } from 'react';

const Rating = ({ value }) => {
    const [color, sign] = (value > 0) ?
        ['lightgreen', '+']
        : (value < 0) ? ['red', '-']
            : ['gray', ''];
    const myStyle = useMemo(() => ({ color }), [color]);
    return <span style={myStyle}>{`${sign}${value || 0}`}</span>
}

export default Rating;