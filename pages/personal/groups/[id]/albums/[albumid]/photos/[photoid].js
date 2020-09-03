import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import PrivatePage from '../../../../../../../src/components-personal/PrivatePage';
import PhotoMain from '../../../../../../../src/components-personal/PhotoPage';

const PhotoPage = () => {
    return <PrivatePage>
        <Toolbar />
        <PhotoMain />
    </PrivatePage>
}

export default PhotoPage;