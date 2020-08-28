import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const PhotoRating = ({ userRating, onChange }) => {
    const onClick = (ratingUpdate) => (e) => {
        onChange(ratingUpdate);
    };
    const plusStyle = { color: (userRating > 0) ? 'green' : 'inherit' };
    const minStyle = { color: (userRating < 0) ? 'red' : 'inherit' };
    return <>
        <IconButton onClick={onClick(1)}>
            <Icon fontSize='small' style={plusStyle}>thumb_up</Icon>
        </IconButton>
        <pre>{(userRating > 0) ? '+1' : (userRating < 0) ? '-1' : ' 0'}</pre>
        <IconButton onClick={onClick(-1)}>
            <Icon fontSize='small' style={minStyle}>thumb_down</Icon>
        </IconButton>
    </>
}

export default PhotoRating;