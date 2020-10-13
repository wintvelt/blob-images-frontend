import React from 'react';
import PrivatePage from '../../src/components-personal/PrivatePage';
import Header from '../../src/components-personal/Header';
import { Toolbar } from '@material-ui/core';

import PhotoList from '../../src/components-personal/PhotoList';
import { useSetLoadingPath } from '../../src/data/loadingData';
import { useReloadPhotoIds, useUserPhotoIds } from '../../src/data/userPhotosData';

const PhotosMain = () => {
    const photoData = useUserPhotoIds();
    const reloadPhotos = useReloadPhotoIds();
    const setLoadingPath = useSetLoadingPath();

    const onPhotoClick = (item) => {
        const photoId = item.photoId;
        const photoPath = '/personal/photos/[photoid]';
        setLoadingPath(photoPath, photoPath.replace('[photoid]', photoId));
    };

    return (
        <main>
            <Toolbar />
            <Header>
                Jouw foto's
            </Header>
            <PhotoList
                photoData={photoData}
                reloadPhotos={reloadPhotos}
                onClick={onPhotoClick}
                noOwner
                menu={true}
                select={false}
                empty="Je hebt nog geen foto's gedeeld zo te zien"
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