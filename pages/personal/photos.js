import React from 'react';
import PrivatePage from '../../src/components-personal/PrivatePage';
import Header from '../../src/components-personal/Header';
import { Toolbar } from '@material-ui/core';

import PhotoList from '../../src/components-personal/PhotoList';
import { useRecoilValueLoadable, useResetRecoilState } from 'recoil';
import { userPhotosState } from '../../src/data/userData';

const onPhotoClick = (e) => alert(JSON.stringify(e));

const PhotosMain = () => {
    const photoData = useRecoilValueLoadable(userPhotosState);
    const reloadPhotos = useResetRecoilState(userPhotosState);

    return (
        <main>
            <Toolbar />
            <Header>
                Your Photos
            </Header>
            <PhotoList
                photoData={photoData}
                reloadPhotos={reloadPhotos}
                onClick={onPhotoClick}
                noOwner
                menu={true}
                select={false}
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