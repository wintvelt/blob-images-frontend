import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const PhotoRating = ({ photo }) => {
    return <>
        <IconButton><Icon fontSize='small'>thumb_up</Icon></IconButton>{'\u00A0'}
        <IconButton><Icon fontSize='small'>thumb_down</Icon></IconButton>
    </>
}

export default PhotoRating;