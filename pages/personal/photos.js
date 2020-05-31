import React from 'react';
import PrivatePage from '../../src/components-personal/PrivatePage';
import Header from '../../src/components-personal/Header';
import { Toolbar } from '@material-ui/core';

import PhotoList from '../../src/components-personal/PhotoList';

const PhotosMain = () => {
    return (
        <main>
            <Toolbar />
            <Header>
                Your Photos
            </Header>
            <PhotoList
                apiKey='myPhotos'
                source='/photos'
                onClick={(e) => alert(JSON.stringify(e))}
                noOwner
                menu={true}
                empty='hmm no photos yet'
            />
        </main>
    )
};

const PhotosPage = () => {
    return <PrivatePage>
        <PhotosMain />
    </PrivatePage>
}

export default PhotosPage;